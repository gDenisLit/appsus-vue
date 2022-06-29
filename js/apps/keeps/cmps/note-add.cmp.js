import addNoteTxt from './add-cmps/add-note-txt.cmp.js'

export default {
  template: `
    <div class="note-add-container">
      <section v-if="!type" class="note-add flex">
        <p @click="changeType('txt')">Take a note...</p>
        <div class="note-type-picker">
          <a @click="changeType('txt')"><i class="fa-solid fa-font"></i></a>
          <a><i class="fa-solid fa-image"></i></a>
          <a><i class="fa-brands fa-youtube"></i></a>
          <a><i class="fa-solid fa-list"></i></a>
          <a><i class="fa-solid fa-volume-high"></i></a>
          <a><i class="fa-solid fa-paintbrush"></i></a>
        </div>
      </section>

      <add-note-txt v-if="type === 'txt'" @added="type = null" />
    </div>
    `,
  components: {
    addNoteTxt,
  },
  data() {
    return {
      type: null,
    }
  },
  created() {},
  methods: {
    changeType(type) {
      console.log('hi')
      this.type = type
    },
  },
  computed: {},
  unmounted() {},
}
