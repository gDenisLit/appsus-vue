import { addNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  template: ` 
    <section class="note-add" @keyup.enter="addNote">
      <div class="add-note-txt flex">
        <input v-model="url" type="url" placeholder="Enter video url from YouTube...">
      </div>
    </section>
`,
  data() {
    return {
      note: {
        type: 'note-video',
        info: {
          videoId: '',
        },
      },
      url: '',
    }
  },
  created() {},
  methods: {
    addNote() {
      // const newNote = JSON.parse(JSON.stringify(this.note))
      const videoId = this.extractId(this.url)
      if (!videoId) {
        // Show user error msg user note found
        return
      }

      this.note.info.videoId = videoId
      addNoteEmit(this.note)
      this.$emit('added')
    },
    extractId(url) {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      const match = url.match(regExp)

      return match && match[7].length == 11 ? match[7] : null
    },
  },
  computed: {},
  unmounted() {},
}
