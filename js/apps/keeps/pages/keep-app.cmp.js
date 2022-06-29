import { keepService } from '../services/keep.service.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
  template: `
    <section class="keep-app">
        <div class="notes">
           <div v-for="note in notes">
            <!-- <pre>{{note}}</pre> -->
              <component class="note" :is="note.type"  
                :info="note.info">
              </component>
            </div>
        </div>
    </section>
`,
  components: {
    noteImg,
    noteTodos,
    noteTxt,
    noteVideo,
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
