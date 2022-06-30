export default {
  props: ['note'],
  template: `
    <section class="note-audio">
      <h4>{{ info.title }}</h4>
      <audio controls>
        <source :src="info.url" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
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
