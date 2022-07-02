import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/eventBus.service.js'
import { keepService } from '../services/keep.service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import noteSide from '../cmps/note-side.cmp.js'

export default {
  template: `
  <main class="app">
      <note-filter @filtered="setFilter" />
      <section v-if="notes" class="keep-app flex">
        <note-side @filtered="setFilter"/>
        <div class="flex">
          <div class="notes">
            <note-add />
            <note-list @switched="switchNotes" :notes="notesToShow" /> 
          </div>
        </div>
      </section>
  </main>
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
      filterBy: {
        txt: '',
        type: '',
      },
      unsubAdded: null,
      unsubRemove: null,
      unsubUpdated: null,
    }
  },
  created() {
    this.getNotes()
    this.unsubAdd = eventBus.on('added', this.addNote)
    this.unsubRemove = eventBus.on('removed', this.removeNote)
    this.unsubUpdated = eventBus.on('updated', this.updateNote)
    eventBus.on('integration', this.addNote)
  },
  methods: {
    getNotes() {
      keepService.query().then(notes => {
        this.notes = notes
      })
    },
    switchNotes(indexes) {
      keepService
        .switchNotes(indexes)
        .then(notes => (this.notes = notes))
        .catch(err => showErrorMsg(err))
    },
    addNote(note) {
      keepService
        .addNote(note)
        .then(note => {
          this.notes.push(note)
          showSuccessMsg('Added note successfuly!')
        })
        .catch(err => showErrorMsg('Somthing went wrong.. Try again!'))
    },
    removeNote(noteId) {
      keepService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex(note => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note removed')
        })
        .catch(err => showErrorMsg('Somthing went wrong.. Try again!'))
    },
    updateNote(noteUpdated) {
      keepService
        .save(noteUpdated)
        .then(() => {
          const idx = this.notes.findIndex(note => note.id === noteUpdated.id)
          this.notes.splice(idx, 1, noteUpdated)
          showSuccessMsg('Note updated')
        })
        .catch(err => showErrorMsg('Somthing went wrong.. Try again!'))
    },
    setFilter({ txt, type }) {
      this.filterBy.txt = ''

      if (txt) this.filterBy.txt = txt
      if (type) this.filterBy.type = type === 'all' ? '' : type
    },
    sortPinned(notes) {
      const pinned = notes.filter(note => note.isPinned)
      const unpinned = notes.filter(note => !note.isPinned)

      return [...pinned, ...unpinned]
    },
  },
  computed: {
    notesToShow() {
      let notes = this.notes

      const { type, txt } = this.filterBy

      if (type) notes = notes.filter(note => note.type === type)

      if (txt) {
        const regex = new RegExp(txt, 'i')
        notes = notes.filter(
          note =>
            regex.test(note.info.title) ||
            regex.test(note.info.txt) ||
            note.info.todos?.some(todo => regex.test(todo.txt))
        )
      }

      return this.sortPinned(notes)
    },
  },
  unmounted() {
    this.unsubAdd()
    this.unsubRemove()
    this.unsubUpdated()
  },
}
