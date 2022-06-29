export default {
  props: ['info'],
  template: `
    <section class="note-video">
      <iframe
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
