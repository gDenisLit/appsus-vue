export default {
  template: `
  <section class="review-add main-layout flex">
    <form action="" class="flex" @submit.prevent="postReview">
      <div class="rate">
        <span @click="review.rate = 1" class="fa fa-star checked"></span>
        <span @click="review.rate = 2" class="fa fa-star" :class="secondStar"></span>
        <span @click="review.rate = 3" class="fa fa-star" :class="thirdStar"></span>
        <span @click="review.rate = 4" class="fa fa-star" :class="fourthStar"></span>
        <span @click="review.rate = 5" class="fa fa-star" :class="fifthStar"></span>
      </div>
    
      <input class="input" type="text" v-model="review.reviewer">
      <input class="input" type="date" v-model="review.date">
      <textarea v-model="review.text" class="input" cols="30" rows="10"></textarea>

      <button class="btn">Post</button>
    </form>
  </section>

`,
  data() {
    return {
      review: {
        reviewer: 'Books Reader',
        rate: 1,
        date: new Date().toISOString().split('T')[0],
        text: '',
      },
    }
  },
  created() {},
  methods: {
    postReview() {
      this.$emit('posted', { ...this.review })
    },
  },
  computed: {
    secondStar() {
      return { checked: this.review.rate > 1 }
    },
    thirdStar() {
      return { checked: this.review.rate > 2 }
    },
    fourthStar() {
      return { checked: this.review.rate > 3 }
    },
    fifthStar() {
      return { checked: this.review.rate > 4 }
    },
  },
  unmounted() {},
}
