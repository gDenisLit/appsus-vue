import { updateEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
        <section class="note-edit-inner flex">
              <iframe
                :src="currUrl"

                frameborder="0" allow="accelerometer; autoplay; 
                encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe> 
              <input v-model="note.info.title"
                      type="text" 
                      placeholder="Title"
                      @change="updateNote" />
              <input v-model="url" type="url"
                      placeholder="Enter new video url from YouTube..." 
                      @keyup.enter="updateNote"/>
        </section>
    `,
  data() {
    return {
      url: '',
    }
  },
  created() {},
  methods: {
    updateNote() {
      const videoId = this.extractId(this.url)
      if (!videoId) {
        // Show user error msg user note found
        return
      }

      const newNote = this.clone()
      newNote.info.videoId = videoId
      updateEmit(newNote)
    },
    clone() {
      return JSON.parse(JSON.stringify(this.note))
    },
    extractId(url) {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      const match = url.match(regExp)

      return match && match[7].length == 11 ? match[7] : null
    },
  },
  computed: {
    currUrl() {
      return 'https://www.youtube.com/embed/' + this.note.info.videoId
    },
  },
}
