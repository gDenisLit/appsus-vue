export default {
  props: ['note'],
  template: `
    <section class="note-img">
        <img :src="info.url" alt="">
        <h4>{{ info.title }}</h4>
    </section>
`,
  computed: {
    info() {
      return this.note.info
    },
  },
}
