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
          <input class="input-search" type="text" v-model="filterBy.txt" @input="filter" placeholder="Search note...">
          <i class="icon fa-solid fa-magnifying-glass"></i>
        </div>
        
    </section>  
`,
  data() {
    return {
      filterBy: {
        txt: '',
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
    },
  },
  computed: {},
  unmounted() {},
}
