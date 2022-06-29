export default {
  template: `
    <section class="note-add flex">
      <p>Take a note...</p>

      <div class="note-type-picker">
        <a><i class="fa-solid fa-font"></i></a>
        <a><i class="fa-solid fa-image"></i></a>
        <a><i class="fa-brands fa-youtube"></i></a>
        <a><i class="fa-solid fa-list"></i></a>
        <a><i class="fa-solid fa-volume-high"></i></a>
        <a><i class="fa-solid fa-paintbrush"></i></a>
      </div>
    </section>
    `,
  data() {
    return {
      note: {},
    }
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
