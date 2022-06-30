import { addEmit } from '../../../../services/eventBus.service.js'

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
               placeholder="Enter audio url"
               @keyup.enter="addNote()">
               <span>Or</span>
               <input type="file" @change="audioInput">
              </div>
          </div>
        </section>
    `,
  data() {
    return {
      note: {
        type: 'note-audio',
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
      addEmit(this.note)
      this.$emit('added')
    },
    audioInput(ev) {
      this.loadAudioFromInput(ev, this.onAudioReady)
    },
    loadAudioFromInput(ev, onAudioReady) {
      const reader = new FileReader()
      //After we read the file
      reader.onload = function (event) {
        const audio = new Audio(event.target.result)
        onAudioReady(audio)
      }
      reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
    },
    onAudioReady(audio) {
      this.note.info.url = audio.src
      this.addNote()
    },
  },
  computed: {},
  unmounted() {},
}
