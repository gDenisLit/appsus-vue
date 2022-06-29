import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/eventBus.service.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
  template: `
    <section class="keep-app">
      <note-list :notes="notes" /> 
    </section>
`,
  components: {
    noteList,
  },
  data() {
    return {
      notes: null,
    }
  },
  created() {
    this.getNotes()
    eventBus.on('changed-bgc', this.changeNoteBgc)
  },
  methods: {
    getNotes() {
      keepService.query().then(notes => {
        this.notes = notes
        console.log(this.notes)
      })
    },
    changeNoteBgc(noteProps) {
      keepService.changeNoteBgc(noteProps).then(() => {
        const { color, noteId } = noteProps
        const note = this.notes.find(note => note.id === noteId)
        note.style.backgroundColor = color
      })
    },
  },
  computed: {},
  unmounted() {},
}
