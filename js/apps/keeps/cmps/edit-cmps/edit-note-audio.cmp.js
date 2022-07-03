import { updateEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
        <section class="note-edit-audio">
            <audio controls>
              <source :src="note.info.url" type="audio/mp3">
              Your browser does not support the audio element.
            </audio>
            <input type="text"
              v-model="note.info.title"
             placeholder="Pick a title first"
             @change="updateNote">
            
             <div class="audio-inputs flex">
               <div>
                <input type="url"
                  v-model="note.info.url"
                  placeholder="Enter audio url"
                  @keyup.enter="addNote()">
                </div>

                <div>
                  <span>Or </span>
                  <label for="file-upload" class="file-upload">
                    <i class="fa-solid fa-upload"></i>
                    <span>Choose file</span>
                  </label>
                  <input type="file" id="file-upload" @change="audioInput">
                </div>

                <!-- <div class="recorder-container flex">
                  <span>Or record yourself</span>
                  <div class="recorder flex">
                    <button :style="recordStyle" :disabled="recordBtn" @click="startRecording"><i class="fa-solid fa-record-vinyl"></i></button>
                    <button :disabled="pauseBtn" @click="pauseRecording">
                      <i v-if="!isPaused" class="fa-solid fa-pause"></i>
                      <i v-else class="fa-solid fa-play"></i>
                    </button>
                    <button @click="stopRecording" :disabled="stopBtn"><i class="fa-solid fa-stop"></i></button>
                 </div> -->

                <!-- </div> -->
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
      updateEmit(newNote)
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
      this.updateNote()
    },
  },
}
