export default {
  template: `
 <section class="book-filter flex">
    <h3>Filter</h3>
    <input class="input" type="text" v-model="filterBy.title"  placeholder="Enter title">
    <div class="price-filter">
      <label for="price">Price</label>
      <input type="range" v-model="filterBy.price" :title="filterBy.price" min="0" max="200" id="price">
    </div>
    <button class="btn" @click="filter">Filter</button>
 </section>
`,
  data() {
    return {
      filterBy: {
        title: '',
        price: 0,
      },
    }
  },
  methods: {
    filter() {
      this.$emit('filtered', this.filterBy)
    },
  },
}
