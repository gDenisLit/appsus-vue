import addNoteTxt from './add-cmps/add-note-txt.cmp.js'
import addNoteImg from './add-cmps/add-note-img.cmp.js'
import addNoteVideo from './add-cmps/add-note-video.cmp.js'

export default {
  template: `
    <section class="note-add-container">
      <div v-if="!type" class="note-add flex">
        <p @click="changeType('txt')">Take a note...</p>
      </div>

      <add-note-txt v-if="type === 'txt'" @added="type = null" />
      <add-note-img v-if="type === 'img'" @added="type = null" />
      <add-note-video v-if="type === 'video'" @added="type = null" />

      <div class="note-type-picker">
          <a @click="changeType('txt')"><i class="fa-solid fa-font"></i></a>
          <a @click="changeType('img')"><i class="fa-solid fa-image"></i></a>
          <a @click="changeType('video')"><i class="fa-brands fa-youtube"></i></a>
          <a><i class="fa-solid fa-list"></i></a>
          <a><i class="fa-solid fa-volume-high"></i></a>
          <a><i class="fa-solid fa-paintbrush"></i></a>
        </div>
    </section>
    `,
  components: {
    addNoteTxt,
    addNoteImg,
    addNoteVideo,
  },
  data() {
    return {
      type: null,
    }
  },
  created() {},
  methods: {
    changeType(type) {
      console.log('hi')
      this.type = type
    },
  },
  computed: {},
  unmounted() {},
}
