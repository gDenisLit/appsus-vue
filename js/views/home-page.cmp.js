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
          </h1>
          <h2>
            <span>Keep</span>
            <span>and</span>
            <span>manage</span>
            <span>all</span>
            <span>your</span>
            <span>important</span>
            <span>information</span>
            <span>at</span>
            <span>one</span>
            <span>place</span>
          </h2>

          <div class="menu">
            <router-link to="/email/inbox">
              <img src="assets/img/logo-mail.png" alt="">
              <!-- <span>Mails</span> -->
            </router-link>
            <router-link to="/keep">
            <img src="assets/img/logo-keep.png" alt="">
              <!-- <span>Keep</span> -->
            </router-link>
            <router-link to="/book">
            <img src="assets/img/logo-book.png" alt="">
              <!-- <span>Books</span> -->
            </router-link>
            <!-- <router-link to="/about">About</router-link> -->
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
