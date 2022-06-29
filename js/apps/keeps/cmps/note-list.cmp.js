import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes'],
  template: `
    <section class="note-list">
      <div v-for="note in notes">
      <!-- <pre>{{note}}</pre> -->
        <note-preview :note="note" />
      </div>
    </section>  
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
