import noteImg from './costumes/note-img.cmp.js'
import noteTxt from './costumes/note-txt.cmp.js'
import noteTodos from './costumes/note-todos.cmp.js'
import noteVideo from './costumes/note-video.cmp.js'
import noteTools from './note-tools.cmp.js'
import noteEdit from './note-edit.cmp.js'

export default {
  props: ['note'],
  template: `
      <section class="note-preview" :style="bgc" 
      @mouseover="mouseOver" 
      @mouseleave="isOver = false" 
      draggable="true" 
      @dragstart="startDrag($event)">
        <component class="note" :is="note.type"  
          :note="note"  >
        </component>
        <note-tools v-if="isOver" :note="note" @updating="isUpdating = true"/>
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
      isOver: false,
    }
  },
  created() {},
  methods: {
    startDrag(event) {
      console.log(event, this.note)
      const props = { event, note: this.note }
      this.$emit('dragging', props)
    },
    mouseOver() {
      this.isOver = true
      document.body.style.cursor = 'grab'
    },
  },
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
