export default {
  template: `
      <section class="color-palette">
          <div v-for="color in colors" 
          :style="{ backgroundColor: color }"
          @click="changeColor(color)"></div>
      </section>
    `,
  data() {
    return {
      colors: [
        '#f03e3e',
        '#f06595',
        '#e599f7',
        '#7950f2',
        '#4c6ef5',
        '#228be6',
        '#15aabf',
        '#12b886',
        '#40c057',
        '#82c91e',
        '#fcc419',
        '#ff922b',
      ],
    }
  },
  created() {},
  methods: {
    changeColor(color) {
      this.$emit('picked', color)
    },
  },
  computed: {},
  unmounted() {},
}
