import reviewPreview from './review-preview.cmp.js'

export default {
  props: ['reviews'],
  template: `
    <section class="review-list main-layout">
      <h2>Reviews</h2>
      <ul class="clean-list">
        <li v-for="review in reviews" class="review-container" :key="review.id">
          <review-preview :review="review" />
          <button @click="remove(review.id)" class="btn">X</button>
        </li>
      </ul>
    </section>
`,
  components: {
    reviewPreview,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    remove(reviewId) {
      this.$emit('removed', reviewId)
    },
  },
  computed: {},
  unmounted() {},
}
