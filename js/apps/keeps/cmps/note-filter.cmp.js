export default {
  template: `
    <section class="app-header">
        <button href="#">☰</button>
        <div class="logo">
            <img src="assets/img/logo-keep.png" alt="">
        </div>
        <h2>Keep</h2>
        <div class="search">
          <input type="text" v-model="filterBy.title" @input="filter" placeholder="Search by title">
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
      this.$emit('filtered', this.filterBy)
    },
  },
  computed: {},
  unmounted() {},
}
