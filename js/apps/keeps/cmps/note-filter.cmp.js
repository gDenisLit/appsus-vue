import { toggleEmit } from '../../../services/eventBus.service.js'

export default {
  template: `
    <section class="app-header">
        <button href="#" @click="toggleSideNav">☰</button>
        <div class="logo">
            <img src="assets/img/logo-keep.png" alt="">
        </div>
        <h2>Keep</h2>
        <div class="search">
          <input class="input-search" type="text" v-model="filterBy.title" @input="filter" placeholder="Search by title">
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
    toggleSideNav() {
      toggleEmit()
      console.log('called')
    },
  },
  computed: {},
  unmounted() {},
}
