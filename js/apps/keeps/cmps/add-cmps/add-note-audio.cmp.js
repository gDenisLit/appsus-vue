import { addEmit } from '../../../../services/eventBus.service.js'

export default {
  template: `
        <section class="note-add-inner note-add-audio">
            <input type="text"
              v-model="note.info.title"
             placeholder="Pick a title first">
            
             <div class="audio-inputs flex">

                <div>
                <input type="url"
                  v-model="note.info.url"
                  placeholder="Enter audio url"
                  @keyup.enter="addNote()">
                </div>
               
               <div>
                <span>Or</span>
                <label for="file-upload" class="file-upload">
                  <i class="fa-solid fa-upload"></i>
                  <span>Choose file</span>
                </label>
                <input type="file" id="file-upload" @change="audioInput">
               </div>

               <div class="recorder-container flex">
                <span>Or record yourself</span>
                <div class="recorder flex">
                    <button :style="recordStyle" :disabled="recordBtn" @click="startRecording"><i class="fa-solid fa-record-vinyl"></i></button>
                    <button :disabled="pauseBtn" @click="pauseRecording">
                      <i v-if="!isPaused" class="fa-solid fa-pause"></i>
                      <i v-else class="fa-solid fa-play"></i>
                    </button>
                    <button @click="stopRecording" :disabled="stopBtn"><i class="fa-solid fa-stop"></i></button>
                </div>

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
      audioCtx: null,
      rec: null,
      input: null,
      gumStream: null,
      recordBtn: false,
      stopBtn: true,
      pauseBtn: true,
      recordURL: window.URL,
      isPaused: false,
      isRecording: false,
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
    startRecording() {
      this.isRecording = true
      let constraints = { audio: true, video: false }

      this.recordBtn = true
      this.stopBtn = false
      this.pauseBtn = false

      const that = this
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          that.audioCtx = new AudioContext()

          that.gumStream = stream

          that.input = that.audioCtx.createMediaStreamSource(stream)

          that.rec = new Recorder(that.input, { numChannels: 1 })

          //start the recording process
          that.rec.record()
        })
        .catch(function (err) {
          //enable the record button if getUserMedia() fails
          that.recordBtn = false
          that.stopBtn = true
          that.pauseBtn = true
        })
    },
    pauseRecording() {
      if (this.rec.recording) {
        //pause
        this.rec.stop()
        this.isPaused = true
      } else {
        //resume
        this.rec.record()
        this.isPaused = false
      }
    },
    stopRecording() {
      this.recordBtn = false
      this.stopBtn = true
      this.pauseBtn = true

      this.isPaused = false
      this.isRecording = false

      //tell the recorder to stop the recording
      this.rec.stop()

      //stop microphone access
      this.gumStream.getAudioTracks()[0].stop()

      //create the wav blob and pass it on to createDownloadLink
      this.rec.exportWAV(this.updateURL)
    },
    updateURL(blob) {
      const url = this.recordURL.createObjectURL(blob)
      this.note.info.url = url
      this.addNote()
    },
  },
  computed: {
    recordStyle() {
      return { color: this.isRecording ? 'var(--error)' : '#ffffff' }
    },
  },
  unmounted() {},
}
