import { updateEmit } from '../../../services/eventBus.service.js'
import editNoteTxt from './edit-cmps/edit-note-txt.cmp.js'
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
          <button class="btn" @click="close">Save & Close</button>
      </section>
`,
  components: {
    editNoteTxt,
    noteTools,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    // updateNote() {
    //   if (this.title) this.note.info.title = this.title
    //   if (this.txt) this.note.info.txt = this.txt
    //   updateEmit(this.note)
    // },
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
  unmounted() {},
}
