import { updateEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
        <section class="note-edit-inner note-edit-img flex">
             <img :src="note.info.url" alt="">
             <input v-model="note.info.title"
                    type="text" 
                    placeholder="Title"
                     @change="updateNote">
                     <div class="img-inputs flex">
               <input type="url"
               v-model="note.info.url"
               placeholder="Enter img url"
               @keyup.enter="addNote()">
               <div>
                <span class="or">or</span>
                <label for="file-upload" class="file-upload">
                  <i class="fa-solid fa-upload"></i>
                  <span>Choose file</span>
                </label>
                <input id="file-upload" type="file" @change="imgInput">
               </div>   
             </div>
             <!-- <div class="img-inputs">
               <input type="url"
               v-model="note.info.url"
               placeholder="Enter new img url"
               @keyup.enter="updateNote">
               <span>Or</span>
               <input type="file" @change="imgInput">
              </div> -->
        </section>
    `,
  data() {
    return {}
  },
  created() {},
  methods: {
    updateNote() {
      const newNote = this.clone()
      updateEmit(newNote)
    },
    imgInput(ev) {
      this.loadImageFromInput(ev, this.onImageReady)
    },
    clone() {
      return JSON.parse(JSON.stringify(this.note))
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
      this.updateNote()
    },
  },
  computed: {},
  unmounted() {},
}
