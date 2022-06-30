import longText from '../../../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import reviewList from '../cmps/review-list.cmp.js'
import { bookService } from '../services/book-service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/eventBus-service.js'

export default {
  template: `
    <section v-if="book" class="book-details-container">
      <div class="book-details main-layout flex">
        <div class=img-box>
          <img :src="book.thumbnail" alt="">
        </div>

        <div class="book-desc">
          <h2>{{ book.title }} <span class="price" :class="priceClass">{{ price }}</span></h2>
          <p class="author">By <span>{{ authors }}</span></p>
          <h4>{{ book.subtitle }}</h4>
          <div class="more-details">
            <div>
              <span class="detial">{{ readingType }}</span>
              <span class="detial">{{ book.language }}</span>
            </div>
            <ul class="tags flex clean-list">
              <li v-for="category in book.categories ">
                <span class="tag">{{category}}</span>
              </li>
            </ul>
          </div>
          <p class="published">Published at {{ book.publishedDate }}, {{ bookAge }}</p>


          

          <long-text :text="book.description"></long-text>

          

          <div v-if="book.listPrice.isOnSale" class="ribbon   ribbon-top-right"><span>sale</span></div>
          <div class="action-btns">
            <div>
              <router-link class="btn" :to="'/book/' + prevBookId">Previous Book</router-link>
              <router-link class="btn" :to="'/book/' + nextBookId">Next Book</router-link>
            </div>
            <button class="btn" @click="goBack">Go Back</button>
          </div>
        </div>
      </div>
      
      <!-- <pre>{{ book.reviews }}</pre> -->
      <review-list :reviews="book.reviews" @removed="removeReview" />
      <review-add @posted="addReview" />
    </section>
    `,
  components: {
    longText,
    reviewAdd,
    reviewList,
  },
  data() {
    return {
      book: null,
      nextBookId: null,
      prevBookId: null,
      isLongText: false,
      langCodes: {
        USD: 'en-US',
        ILS: 'he-il',
        EUR: 'en-gb',
      },
    }
  },
  created() {},
  watch: {
    '$route.params.bookId': {
      handler() {
        const id = this.$route.params.bookId

        if (!id) return

        bookService.get(id).then(book => {
          this.book = book
          bookService.getNeighborsId(book.id).then(({ prev, next }) => {
            this.prevBookId = prev
            this.nextBookId = next
          })
        })
      },
      immediate: true,
    },
  },
  methods: {
    addReview(review) {
      bookService.addReview(this.book.id, review).then(book => {
        this.book = book
        // showSuccessMsg('Review was successfully posted!')
      })
      // .catch(error => showErrorMsg('Somthing went wrong, Try again!'))
    },
    removeReview(reviewId) {
      bookService.removeReview(this.book.id, reviewId).then(book => {
        this.book = book
        // showSuccessMsg('Review was successfully removed!')
      })
    },
    goBack() {
      this.$router.push('/book')
    },
  },
  computed: {
    readingType() {
      if (this.book.pageCount > 500) return 'Long reading'
      if (this.book.pageCount > 200) return 'Decent reading'
      return 'Light reading'
    },
    bookAge() {
      const currYear = new Date().getFullYear()
      const { publishedDate } = this.book
      if (currYear > publishedDate + 10) return 'Veteran Book'
      if (currYear === publishedDate + 1) return 'New!'
      return ''
    },
    priceClass() {
      const { amount } = this.book.listPrice
      return { 'high-price': amount > 150, 'low-price': amount < 20 }
    },
    authors() {
      return this.book.authors.join(', ')
    },
    price() {
      const { currencyCode } = this.book.listPrice
      return this.book.listPrice.amount.toLocaleString(
        this.langCodes[currencyCode],
        {
          style: 'currency',
          currency: currencyCode,
        }
      )
    },
  },
}
