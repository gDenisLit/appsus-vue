import addNoteTxt from './add-cmps/add-note-txt.cmp.js'
import addNoteImg from './add-cmps/add-note-img.cmp.js'
import addNoteVideo from './add-cmps/add-note-video.cmp.js'
import addNoteTodos from './add-cmps/add-note-todos.cmp.js'
import addNoteAudio from './add-cmps/add-note-audio.cmp.js'
import addNoteDraw from './add-cmps/add-note-draw.cmp.js'

export default {
  template: `
  <div class="note-add-wrapper">
      <section class="note-add">
        <div v-if="!type" class="text-box flex">
          <p @click="changeType('txt')">Take a note...</p>
        </div>

        <add-note-txt v-if="type === 'txt'" @added="type = null" />
        <add-note-img v-if="type === 'img'" @added="type = null" />
        <add-note-video v-if="type === 'video'" @added="type = null" />
        <add-note-todos v-if="type === 'todos'" @added="type = null" />
        <add-note-audio v-if="type === 'audio'" @added="type = null" />
        <add-note-draw v-if="type === 'draw'" @added="type = null" />

        <div class="type-picker grid">
            <a @click="changeType('txt')"
              :class="{ active: type === 'txt'}">
              <i class="fa-solid fa-font"></i></a>
            <a @click="changeType('img')"
              :class="{ active: type === 'img'}">
              <i class="fa-solid fa-image"></i></a>
            <a @click="changeType('video')"
              :class="{ active: type === 'video'}">
              <i class="fa-brands fa-youtube"></i></a>
            <a @click="changeType('todos')"
              :class="{ active: type === 'todos'}">
              <i class="fa-solid fa-list"></i></a>
            <a @click="changeType('audio')"
              :class="{ active: type === 'audio'}">
              <i class="fa-solid fa-volume-high"></i></a>
            <a @click="changeType('draw')"><i class="fa-solid fa-paintbrush"></i></a>
          </div>
      </section>
    </div>
    `,
  components: {
    addNoteTxt,
    addNoteImg,
    addNoteVideo,
    addNoteTodos,
    addNoteAudio,
    addNoteDraw,
  },
  data() {
    return {
      type: null,
    }
  },
  created() {},
  methods: {
    changeType(type) {
      this.type = type
    },
  },
  computed: {},
  unmounted() {},
}
