import noteColorPalette from './note-color-palette.cmp.js'
import {
  changeBgcEmit,
  removeNoteEmit,
  addNoteEmit,
} from '../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
      <section class="note-tools flex">
        <a><i class="fa-solid fa-thumbtack"></i></a>
        <a class="color-palette-btn">
          <span>
            <i class="fa-solid fa-palette"></i>
          </span>
            <note-color-palette @picked="changeBgc" />
        </a>
        <a @click="$emit('updating')"><i class="fa-solid fa-pen-to-square"></i></a>
        <a @click="addClone"><i class="fa-solid fa-clone"></i></a>
        <a><i class="fa-solid fa-envelope-open-text"></i></a>
        <a @click="removeNote()"><i class="fa-solid fa-trash-can"></i></a>
      </section>
    `,
  components: {
    noteColorPalette,
  },
  data() {
    return {
      showColors: false,
    }
  },
  created() {},
  methods: {
    changeBgc(color) {
      changeBgcEmit(color, this.note.id)
    },
    removeNote() {
      removeNoteEmit(this.note.id)
    },
    addClone() {
      const newNote = JSON.parse(JSON.stringify(this.note))
      addNoteEmit(newNote)
    },
  },
  computed: {},
  unmounted() {},
}
