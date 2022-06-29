export default {
  template: `
    <header>
      <h1>Hello i am header</h1>
      <nav class="nav-bar">
      <router-link to="/">Home</router-link>
          <!-- <router-link to="/book">Books</router-link> -->
          <router-link to="/email">Emails</router-link>
          <router-link to="/keep">Keeps</router-link>
          <router-link to="/about">About</router-link>
        </nav>
    </header>
`,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
