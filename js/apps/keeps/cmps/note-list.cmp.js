import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes'],
  template: `
    <div class="note-list-container">

   
    <section class="note-list">
      <div v-for="note in notes.pinned">
      <!-- <pre>{{note}}</pre> -->
        <note-preview :note="note" />
      </div>
      <div v-for="note in notes.unpinned">
      <!-- <pre>{{note}}</pre> -->
        <note-preview :note="note" />
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
  methods: {},
  computed: {},
  unmounted() {},
}
