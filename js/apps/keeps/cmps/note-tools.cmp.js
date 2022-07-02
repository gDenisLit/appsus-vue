import noteColorPalette from './note-color-palette.cmp.js'
import {
  removeEmit,
  updateEmit,
  addEmit,
} from '../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
      <section class="note-tools flex" @click.stop>
        <a @click="togglePin" title="Pin">
          <i class="fa-solid fa-thumbtack"></i></a>
        <a class="color-palette-btn" title="background color">
          <span>
            <i class="fa-solid fa-palette"></i>
          </span>
          <note-color-palette @picked="changeBgc" />
        </a>
        <a @click="$emit('updating')" title="Edit">
          <i class="fa-solid fa-pen-to-square"></i></a>
        <a @click="addClone" title="Duplicate">
          <i class="fa-solid fa-clone"></i></a>
        <a @click="composeEmail" title="Send as email">
          <i class="fa-solid fa-envelope-open-text"></i></a>
        <a @click="removeNote()" title="Remove">
          <i class="fa-solid fa-trash-can"></i></a>
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
      const newNote = this.clone()
      newNote.style.backgroundColor = color

      updateEmit(newNote)
    },
    removeNote() {
      removeEmit(this.note.id)
    },
    addClone() {
      const newNote = this.clone()
      addEmit(newNote)
    },
    togglePin() {
      const newNote = this.clone()
      newNote.isPinned = !newNote.isPinned
      updateEmit(newNote)
    },
    clone() {
      return JSON.parse(JSON.stringify(this.note))
    },
    composeEmail() {
      const type = this.note.type.split('-')[1]
      console.log(type)
      const info = this.note.info
      const title = info.title

      let body
      if (type === 'txt') body = info.txt
      if (type === 'img' || type === 'audio') body = info.url
      if (type === 'video') {
        body = 'https://www.youtube.com/watch?v=' + info.videoId
      }
      if (type === 'todos') {
        const todosStr = info.todos
          .map((todo, idx) => `${idx + 1}. ${todo.txt}\n`)
          .join('')
        body = todosStr
      }

      this.$router.push({
        name: 'compose',
        params: { title: title || '', body },
      })
    },
  },
  computed: {},
  unmounted() {},
}
