import { updateNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
    <section class="note-edit">
        <input @keyup.enter="updateNote" v-model="title" type="text" placeholder="Enter new title">
        <input @keyup.enter="updateNote" v-model="txt" v-if="note.type === 'note-txt'" type="text" placeholder="Enter new note">
    </section>
`,
  data() {
    return {
      title: '',
      txt: '',
    }
  },
  created() {},
  methods: {
    updateNote() {
      console.log(this.note)
      if (this.title) this.note.info.title = this.title
      if (this.txt) this.note.info.txt = this.txt
      updateNoteEmit(this.note)
    },
  },
  computed: {},
  unmounted() {},
}
