import { addNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  template: `
        <section class="note-add">
          <div class="add-note-img">
            <input type="text"
              v-model="note.info.title"
             placeholder="Pick a title first">
            
             <div class="img-inputs">
               <input type="url"
               v-model="note.info.url"
               placeholder="Enter img url"
               @keyup.enter="addNote()">
               <span>or</span>
               <label for="file-upload" class="file-upload">
                <i class="fa-solid fa-upload"></i>
                 <span>Choose file</span>
               </label>
               <input id="file-upload" type="file" @change="imgInput">
             </div>
          </div>
        </section>
    `,
  data() {
    return {
      note: {
        type: 'note-img',
        info: {
          url: '',
          title: '',
        },
      },
    }
  },
  created() {},
  methods: {
    addNote() {
      // const newNote = JSON.parse(JSON.stringify(this.note))
      addNoteEmit(this.note)
      this.$emit('added')
    },
    imgInput(ev) {
      this.loadImageFromInput(ev, this.onImageReady)
    },
    loadImageFromInput(ev, onImageReady) {
      const reader = new FileReader()
      //After we read the file
      reader.onload = function (event) {
        const img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        //Run the callBack func , To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
      }
      reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
    },
    onImageReady(img) {
      this.note.info.url = img.src
      this.addNote()
    },
  },
  computed: {},
  unmounted() {},
}
