export default {
  props: ['review'],
  template: `
    <article class="review-preview">
      <span v-for="i in review.rate">
        <span class="fa fa-star checked"></span>
      </span>
      <p class="reviewer">By {{ review.reviewer }}</p>
      <p class="date">{{ review.date }}</p>
      <p>{{ review.text }}</p>
    </article>
`,
}
