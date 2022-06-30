import { bookService } from '../services/book-service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/eventBus-service.js'

export default {
  emits: ['added'],
  template: `
      <section class="book-add">
        <h3>Add a book</h3>
        <input class="input" 
        v-model="keyword" 
        type="search" 
        @keyup.enter="searchBooks" 
        placeholder="Search a book.. Click enter for results">

        <div v-if="books" class="books-search-container">
          <ul class="clean-list">
            <li v-for="book in books">
              <span>{{ book.title }}</span>
              <button class="btn" @click="addBook(book)">+</button>
            </li>
          </ul>
        </div>
      </section>
    `,
  data() {
    return {
      keyword: '',
      books: null,
    }
  },
  watch: {
    keyword(value) {
      if (!value) this.books = null
    },
  },
  created() {},
  methods: {
    searchBooks() {
      bookService
        .getGoogleBooks(this.keyword)
        .then(books => (this.books = books))
    },
    addBook(book) {
      bookService.addGoogleBook(book).then(book => {
        this.$emit('added')
        // showSuccessMsg('Book added succsefuly!')
      })
      // .catch(err => showErrorMsg('Somthing went wrong..try again!'))
    },
  },
  computed: {},
  unmounted() {},
}
