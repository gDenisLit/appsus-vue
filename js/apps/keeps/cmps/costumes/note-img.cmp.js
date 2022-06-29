import noteAddCmp from '../note-add.cmp'

export default {
  props: ['note'],
  template: `
    <section class="note-img">
        <img :src="info.url" alt="">
        <h4>{{ info.title }}</h4>
    </section>
`,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    info() {
      return this.note.info
    },
  },
  unmounted() {},
}
