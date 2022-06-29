import { keepService } from '../services/keep.service.js'
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
  },
  methods: {
    getNotes() {
      keepService.query().then(notes => {
        this.notes = notes
        console.log(this.notes)
      })
    },
  },
  computed: {},
  unmounted() {},
}
