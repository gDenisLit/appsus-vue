export default {
  template: `
    <header>
      
    <div class="logo">
      <img src="assets/img/logo2.png" alt="">
    </div>
      <nav class="nav-bar">
      <router-link to="/">Home</router-link>
          <!-- <router-link to="/book">Books</router-link> -->
          <router-link to="/email/inbox">Emails</router-link>
          <router-link to="/keep">Keeps</router-link>
          <router-link to="/book">Books</router-link>
          <router-link to="/about">About</router-link>
          <div class="dot"></div>
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
