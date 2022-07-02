export default {
  props: ['labels'],
  template: `
    <section class="label-list">
        <ul class="flex clean-list">
          <li 
          class="label flex space-between" 
          v-for="(label, idx) in labels"
          :style="{backgroundColor: label.color}">
              <span >{{ label.title }}</span>
              <span class="remove" @click="remove()">x</span>
          </li>
        </ul>
    </section>
`,
  data() {
    return {}
  },
  created() {},
  methods: {
    remove(idx) {
      const labels = [...this.labels]
      labels.splice(idx, 1)
      this.$emit('removed', labels)
    },
  },
  computed: {},
  unmounted() {},
}
