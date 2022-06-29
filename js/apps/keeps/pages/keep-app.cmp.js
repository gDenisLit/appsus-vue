import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/eventBus.service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
  template: `
    <section class="keep-app">
      <note-add />
      <note-list :notes="notes" /> 
    </section>
`,
  components: {
    noteList,
    noteAdd,
  },
  data() {
    return {
      notes: null,
    }
  },
  created() {
    this.getNotes()
    eventBus.on('changed-bgc', this.changeNoteBgc)
    eventBus.on('added-note', this.addNote)
    eventBus.on('removed', this.removeNote)
    eventBus.on('updated', this.updateNote)
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
    addNote(note) {
      keepService.addNote(note).then(note => this.notes.push(note))
    },
    removeNote(noteId) {
      keepService.remove(noteId).then(() => {
        const idx = this.notes.findIndex(note => note.id === noteId)
        this.notes.splice(idx, 1)
      })
    },
    updateNote(noteUpdated) {
      keepService.save(noteUpdated).then(() => {
        const idx = this.notes.findIndex(note => note.id === noteUpdated.id)
        this.notes.splice(idx, 1, noteUpdated)
      })
    },
  },
  computed: {},
  unmounted() {},
}
