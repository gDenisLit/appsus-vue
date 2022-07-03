import editNoteImg from './edit-cmps/edit-note-img.cmp.js'
import editNoteTxt from './edit-cmps/edit-note-txt.cmp.js'
import editNoteVideo from './edit-cmps/edit-note-video.cmp.js'
import editNoteTodos from './edit-cmps/edit-note-todos.cmp.js'
import editNoteAudio from './edit-cmps/edit-note-audio.cmp.js'
import noteTools from './note-tools.cmp.js'

export default {
  props: ['note'],
  emits: ['closed'],
  template: `
      <div class="screen" @click="close"></div>
      <section class="note-edit flex" :style="bgc">
          <component class="note" :is="type"  
            :note="note"  >
          </component> 
          <note-tools :note="note"/>
          <button class="btn" @click="close">Close</button>
      </section>
`,
  components: {
    editNoteTxt,
    editNoteImg,
    editNoteVideo,
    editNoteTodos,
    editNoteAudio,
    noteTools,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    close() {
      this.$emit('closed')
    },
    clone() {},
  },
  computed: {
    type() {
      return 'edit-' + this.note.type
    },
    bgc() {
      return { backgroundColor: this.note.style.backgroundColor }
    },
  },
}
