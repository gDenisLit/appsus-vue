export default {
  template: `
    <section class="app-header">
        <button href="#">☰</button>
        <div class="logo">
            <img src="assets/img/logo-mail.png" alt="">
        </div>
        <h2>Mail</h2>
        <div class="search">
          <input type="text" v-model="filterBy.title" @input="filter" placeholder="Search">
          <i class="icon fa-solid fa-magnifying-glass"></i>
        </div>
        
    </section>  
`,
  data() {
    return {
      filterBy: {
        title: '',
      },
    }
  },
  created() {},
  methods: {
    filter() {
      this.$emit('search', this.filterBy.title)
    },
  },
  computed: {},
  unmounted() {},
}
