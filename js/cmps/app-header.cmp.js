export default {
  template: `
    <header>
      
    <div class="logo">
      <img src="assets/img/logo.png" alt="">
    </div>
    <!-- <button @click="navOpen = !navOpen">MENU</button> -->
    <div class="nav-btn-wrap">
    <input type="checkbox" v-model="navOpen" id="checkbox4" class="checkbox4 visuallyHidden">
        <label for="checkbox4">
            <div class="hamburger hamburger4">
                <span class="bar bar1"></span>
                <span class="bar bar2"></span>
                <span class="bar bar3"></span>
                <span class="bar bar4"></span>
                <span class="bar bar5"></span>
            </div>
        </label>
    </div>
    
      <nav v-if="navOpen" class="nav-bar">
          <router-link to="/">
          <i class="fa-solid fa-house"></i>
          <span>Home</span>
          </router-link>
          <router-link to="/email/inbox">
            <i class="fa-solid fa-envelope"></i>
            <span>Emails</span>
          </router-link>
          <router-link to="/keep">
            <i class="fa-solid fa-note-sticky"></i>
            <span>Keeps</span>
          </router-link>
          <router-link to="/book">
            <i class="fa-solid fa-book"></i>
            <span>Books</span>
          </router-link>
          <router-link to="/about">
            <i class="fa-solid fa-address-card"></i>
            <span>About</span>
          </router-link>
          <div class="dot"></div>
        </nav>

    </header>
`,
  data() {
    return {
      navOpen: false,
    }
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
