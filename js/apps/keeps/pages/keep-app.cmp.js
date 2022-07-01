import { keepService } from '../services/keep.service.js'
import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/eventBus.service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import noteSide from '../cmps/note-side.cmp.js'

export default {
  template: `
  <div class="app">
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
  </div>
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
    }
  },
  created() {
    this.getNotes()
    eventBus.on('addedNote', this.addNote)
    eventBus.on('removedNote', this.removeNote)
    eventBus.on('updatedNote', this.updateNote)
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
      keepService.addNote(note).then(note => {
        this.notes.push(note)
        showSuccessMsg('Added note successfuly!')
      })
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
    setFilter({ txt, type }) {
      this.filterBy.txt = ''

      if (txt) this.filterBy.txt = txt
      if (type) this.filterBy.type = type === 'all' ? '' : type
    },
    filterPinned(notes) {
      const pinned = notes.filter(note => note.isPinned)
      const unpinned = notes.filter(note => !note.isPinned)

      return [...pinned, ...unpinned]
    },
  },
  computed: {
    notesToShow() {
      // if (!this.filterBy) return this.filterPinned(this.notes)

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

      return this.filterPinned(notes)
    },
  },
  unmounted() {},
}
