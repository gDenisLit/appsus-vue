import { addNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  template: ` 
    <section class="note-add" @keyup.enter="addNote">
      <div class="add-note-txt flex">
        <input v-model="note.info.url" type="url" placeholder="Enter video url...">
      </div>
    </section>
`,
  data() {
    return {
      note: {
        type: 'note-video',
        info: {
          url: '',
        },
      },
    }
  },
  created() {},
  methods: {
    addNote() {
      // const newNote = JSON.parse(JSON.stringify(this.note))
      addNoteEmit(this.note)
      this.$emit('added')
    },
  },
  computed: {},
  unmounted() {},
}
