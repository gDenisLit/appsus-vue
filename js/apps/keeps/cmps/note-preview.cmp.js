import noteImg from './costumes/note-img.cmp.js'
import noteTxt from './costumes/note-txt.cmp.js'
import noteTodos from './costumes/note-todos.cmp.js'
import noteVideo from './costumes/note-video.cmp.js'
import noteTools from './note-tools.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteAudio from './costumes/note-audio.cmp.js'
import labelList from '../../../cmps/label-list.cmp.js'
import { updateEmit } from '../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
      <section class="note-preview" 
        :style="bgc" 
        @mouseover="mouseOver" 
        @mouseleave="mouseLeave" 
        draggable="true" 
        @dragstart="startDrag($event)">

        <div @click="isUpdating = true">
          <component class="note" :is="note.type"  
            :note="note"  >
          </component>
          <div v-if="note.labels" @click.stop>
            <label-list :labels="note.labels" @removed="updateNote" />
          </div>
          <note-tools :note="note" @updating="isUpdating = true" />
        </div>

        <div v-if="isUpdating" class="note-edit-container">
          <note-edit  :note="clone()" @closed="isUpdating = false"/>
        </div>

      </section>
    `,
  components: {
    noteImg,
    noteTodos,
    noteTxt,
    noteVideo,
    noteTools,
    noteEdit,
    noteAudio,
    labelList,
  },
  data() {
    return {
      isUpdating: false,
    }
  },
  created() {},
  methods: {
    startDrag(event) {
      const props = { event, note: this.note }
      this.$emit('dragging', props)
    },
    mouseOver() {
      this.isOver = true
      document.body.style.cursor = 'grab'
    },
    mouseLeave() {
      this.isOver = false
      document.body.style.cursor = 'auto'
    },
    updateNote(labels) {
      const newNote = this.clone()
      newNote.labels = labels
      updateEmit(newNote)
    },
    clone() {
      return JSON.parse(JSON.stringify(this.note))
    },
  },
  computed: {
    bgc() {
      return { backgroundColor: this.note.style.backgroundColor }
    },
  },
}
