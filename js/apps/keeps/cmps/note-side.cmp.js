export default {
  template: `
      <section class="side-nav flex column">
          <button class="nav-btn">Inbox</button>
          <button class="nav-btn">Unread</button>
          <button class="nav-btn">Sent</button>
          <button class="nav-btn">Drafts</button>
          <button class="nav-btn">Somthing</button>
      </section>
  `,
  data() {
    return {}
  },
  components: {},
  methods: {
    sendNewEmail(newEmail) {
      this.$emit('send', newEmail)
      this.compose = !this.compose
    },
    composeMode() {
      this.compose = !this.compose
    },
    setSort(type) {
      this.$emit('sort', type)
    },
  },
  computed: {},
  created() {},
  unmounted() {},
  emits: ['send', 'sort'],
}
