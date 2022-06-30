import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/eventBus.service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import noteSide from '../cmps/note-side.cmp.js'

export default {
  template: `
    <section v-if="notes" class="keep-app">
      <note-filter @filtered="setFilter" />
      <div class="flex">
        <note-side/>
        <div class="notes">
          <note-add />
          <note-list @switched="switchNotes" :notes="notesToShow" /> 
        </div>
      </div>
    </section>
`,
  components: {
    noteList,
    noteAdd,
    noteFilter,
    noteSide,
  },
  data() {
    return {
      notes: null,
      filterBy: null,
    }
  },
  created() {
    this.getNotes()
    eventBus.on('added', this.addNote)
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
    switchNotes(indexes) {
      keepService.switchNotes(indexes).then(notes => (this.notes = notes))
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
    setFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy))
    },
    filterPinned(notes) {
      const pinned = notes.filter(note => note.isPinned)
      const unpinned = notes.filter(note => !note.isPinned)

      return [...pinned, ...unpinned]
    },
  },
  computed: {
    notesToShow() {
      if (!this.filterBy) return this.filterPinned(this.notes)

      let notes = this.notes

      if (this.filterBy.title) {
        const regex = new RegExp(this.filterBy.title, 'i')
        notes = notes.filter(note => regex.test(note.info.title))
      }

      return this.filterPinned(notes)
    },
  },
  unmounted() {},
}
