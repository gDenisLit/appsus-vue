import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'

export default {
  template: `
    <section class="main-layout book-app">
      <div class="book-app-header flex space-between">
        <div class="book-logo">
          <img src="assets/img/logo-book.png" alt="">
        </div>
        <book-filter @filtered="setFilter"/>
        <book-add @added="getBooks"/>
      </div>
      <book-list :books="booksToShow" />
    </section>
  `,
  data() {
    return {
      books: null,
      filterBy: null,
    }
  },
  components: {
    bookList,
    bookFilter,
    bookAdd,
  },
  created() {
    this.getBooks()
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy))
    },
    getBooks() {
      bookService.query().then(books => (this.books = books))
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books

      console.log(this.filterBy)

      let books = this.books

      if (this.filterBy.title) {
        const regex = new RegExp(this.filterBy.title, 'i')
        books = books.filter(book => regex.test(book.title))
      }

      if (this.filterBy.price) {
        books = books.filter(
          book => book.listPrice.amount >= this.filterBy.price
        )
      }
      return books
    },
  },
}
