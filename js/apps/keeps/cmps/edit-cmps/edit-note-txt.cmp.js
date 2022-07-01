import { updateNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: ` 
    <section class="note-edit-inner edit-note-txt flex" @click="close">
        <input v-model="note.info.title"
         type="text" 
         placeholder="Title"
         @change="updateNote">
        <input v-model="note.info.txt" 
        type="text" 
        placeholder="Take a note..."
        @change="updateNote">
    </section>
`,
  data() {
    return {}
  },
  created() {},
  methods: {
    updateNote() {
      const newNote = this.clone()
      updateNoteEmit(newNote)
    },
    clone() {
      return JSON.parse(JSON.stringify(this.note))
    },
  },
  computed: {},
  unmounted() {},
}
