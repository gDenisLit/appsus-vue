import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes'],
  template: `
    <div class="note-list-container">

   
    <section class="note-list">
      <div v-for="(note, idx) in notes" 
      class="note-container"
      @drop="onDrop($event, idx)"
      @dragenter.prevent @dragover.prevent
      :key="note.id" >
        <div v-if="note.isPinned" class="pinned">
            <i class="fa-solid fa-thumbtack"></i>
        </div>
        <note-preview @dragging="startDrag" :note="note" />
      </div>
    </section>  
    </div>
    `,
  components: {
    notePreview,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    startDrag({ event, note }) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', note.id)
    },
    onDrop(event, idx) {
      const noteId = event.dataTransfer.getData('itemID')

      const noteIdx = this.notes.findIndex(note => note.id === noteId)

      const indexes = { idx1: idx, idx2: noteIdx }

      this.$emit('switched', indexes)
    },
  },
  computed: {},
  unmounted() {},
}
