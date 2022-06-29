export default {
  props: ['info'],
  template: `
    <section class="note-video">
      <iframe width="200" height="100"
        :src="info.url">
      </iframe> 
    </section>
    `,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
