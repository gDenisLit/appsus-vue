export default {
  props: ['note'],
  template: `
      <section class="note-txt">
          <h4 v-if="info.title">{{ info.title }}</h4>
          <p v-if="info.txt">{{ info.txt }}</p>
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
