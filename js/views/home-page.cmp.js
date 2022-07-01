export default {
  template: `
    <main class="home-page">
    <div class="text-box">
          <h1 class="heading-primary">
            <!-- <span class="heading-primary-main">Appsus</span> -->
            <svg viewBox="0 0 960 300">
              <symbol id="s-text">
                <text text-anchor="middle" x="50%" y="80%">APPSUS </text>
                <text text-anchor="middle" x="52%" y="80%">APPSUS </text>
                
              </symbol>

              <g class = "g-ants">
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
              </g>
            </svg>
            <span class="heading-primary-sub">
              Better keep all your important information in one place</span
            >
          </h1>
          <div class="menu">
            <router-link to="/email/inbox">Emails</router-link>
            <router-link to="/keep">Keeps</router-link>
            <router-link to="/book">Books</router-link>
            <router-link to="/about">About</router-link>
          </div>
          
        </div>
    </main>
`,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
