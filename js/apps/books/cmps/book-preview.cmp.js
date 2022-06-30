export default {
  props: ['book'],
  template: `
    <article class="book-preview">
      <img :src="book.thumbnail" alt="">
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="book-price details"><span>{{ price }}</span></p>
      <div v-if="book.listPrice.isOnSale" class="ribbon ribbon-top-right"><span>sale</span></div>
    </article>
    `,
  data() {
    return {
      langCodes: {
        USD: 'en-US',
        ILS: 'he-il',
        EUR: 'en-gb',
      },
    }
  },
  created() {},
  methods: {},
  computed: {
    price() {
      const currencyCode = this.book.listPrice.currencyCode
      return this.book.listPrice.amount.toLocaleString(
        this.langCodes[currencyCode],
        {
          style: 'currency',
          currency: currencyCode,
        }
      )
    },
  },
  // unmounted() {},
}
