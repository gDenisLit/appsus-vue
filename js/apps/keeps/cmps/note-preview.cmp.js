import noteImg from './costumes/note-img.cmp.js'
import noteTxt from './costumes/note-txt.cmp.js'
import noteTodos from './costumes/note-todos.cmp.js'
import noteVideo from './costumes/note-video.cmp.js'
import noteTools from './note-tools.cmp.js'
import noteEdit from './note-edit.cmp.js'

export default {
  props: ['note'],
  template: `
      <section class="note-preview" :style="bgc">
        <component class="note" :is="note.type"  
          :note="note"  >
        </component>
        <note-tools :note="note" @updating="isUpdating = true"/>
        <note-edit v-if="isUpdating" :note="cloneNote"/>
      </section>
    `,
  components: {
    noteImg,
    noteTodos,
    noteTxt,
    noteVideo,
    noteTools,
    noteEdit,
  },
  data() {
    return {
      isUpdating: false,
    }
  },
  created() {},
  methods: {},
  computed: {
    bgc() {
      return { backgroundColor: this.note.style.backgroundColor }
    },
    cloneNote() {
      return JSON.parse(JSON.stringify(this.note))
    },
  },
  unmounted() {},
}
