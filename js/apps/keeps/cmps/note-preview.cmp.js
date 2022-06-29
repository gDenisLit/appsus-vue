import noteImg from './costumes/note-img.cmp.js'
import noteTxt from './costumes/note-txt.cmp.js'
import noteTodos from './costumes/note-todos.cmp.js'
import noteVideo from './costumes/note-video.cmp.js'

export default {
  props: ['note'],
  template: `
      <section class="note-preview">
        <component class="note" :is="note.type"  
          :info="note.info">
        </component>
      </section>
    `,
  components: {
    noteImg,
    noteTodos,
    noteTxt,
    noteVideo,
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
