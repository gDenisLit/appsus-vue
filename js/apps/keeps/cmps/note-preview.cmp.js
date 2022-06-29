import noteImg from './costumes/note-img.cmp.js'
import noteTxt from './costumes/note-txt.cmp.js'
import noteTodos from './costumes/note-todos.cmp.js'
import noteVideo from './costumes/note-video.cmp.js'
import noteTools from './note-tools.cmp.js'

export default {
  props: ['note'],
  template: `
      <section class="note-preview" :style="bgc">
        <component class="note" :is="note.type"  
          :info="note.info">
        </component>
        <note-tools :note="note" />
      </section>
    `,
  components: {
    noteImg,
    noteTodos,
    noteTxt,
    noteVideo,
    noteTools,
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    bgc() {
      return { backgroundColor: this.note.style.backgroundColor }
    },
  },
  unmounted() {},
}
