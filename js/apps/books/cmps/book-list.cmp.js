import bookPreview from './book-preview.cmp.js'

export default {
  props: ['books'],
  template: `
      <section class="book-list">
        <ul class="grid books-container">
            <li v-for="book in books" :key="book.id" class="book-preview-container card">
            <router-link :to="'/book/'+book.id">
                <book-preview :book="book"/>
                <div class="actions">
                    <!-- <button class="btn" @click="remove(book.id)">X</button>
                    <button  class="btn" @click="select(book)">Details</button> -->
                </div>
            </router-link>
            </li>
        </ul>
    </section>
`,
  components: {
    bookPreview,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    remove(bookId) {
      this.$emit('removed', bookId)
    },
  },
  computed: {},
  unmounted() {},
}
