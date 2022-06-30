export default {
  template: `

      <section class="app-header">
          <button href="#">☰</button>
          <div class="logo">
              <img src="assets/img/logo-mail.png" alt="">
          </div>
          <h2>Mail</h2>
          <div class="search">
            <input class="input-search" type="text" v-model="filterBy.title" @input="filter" placeholder="Search">
            <i class="icon fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-sliders" @click="showDropDown"></i>
            <div class="adv-filter" v-if="isDropDown">
              <h1>Sort By</h1>
              <div class="by-date">
                <input class="sort-date" type="checkbox" v-model="sortBy.date" @change="sort">
                <span>By Date</span>
                <i class="fa-solid fa-arrow-up-z-a" @click="sortDir"></i>
              </div>
            </div>
          </div>
        </section>  
`,
  data() {
    return {
      filterBy: {
        title: '',
      },
      sortBy: {
        date: null,
        direction: null,
      },
      isDropDown: false,
    }
  },
  created() {},
  methods: {
    filter() {
      this.$emit('search', this.filterBy.title)
    },
    sort() {
      this.$emit('sort', this.sortBy)
    },
    sortDir() {
      this.sortBy.direction = !this.sortBy.direction
      this.$emit('sort', this.sortBy)
    },
    showDropDown() {
      this.isDropDown = !this.isDropDown
    },
  },
  computed: {},
  unmounted() {},
}
