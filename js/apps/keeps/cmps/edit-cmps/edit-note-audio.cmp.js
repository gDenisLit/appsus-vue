import { updateNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
        <section class="note-add">
          <div class="add-note-img">
            <audio controls>
              <source :src="note.info.url" type="audio/mp3">
              Your browser does not support the audio element.
            </audio>
            <input type="text"
              v-model="note.info.title"
             placeholder="Pick a title first"
             @change="updateNote">
            
             <div class="">
               <input type="url"
               v-model="note.info.url"
               placeholder="Enter audio url"
               @keyup.enter="updateNote">
               <span>Or</span>
               <input type="file" @change="audioInput">
              </div>
          </div>
        </section>
    `,
  data() {
    return {}
  },
  created() {},
  methods: {
    updateNote() {
      const newNote = this.clone()
      updateNoteEmit(newNote)
    },
    clone() {
      return JSON.parse(JSON.stringify(this.note))
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
      console.log(this.note.info.url)
      this.updateNote()
    },
  },
  computed: {},
  unmounted() {},
}
