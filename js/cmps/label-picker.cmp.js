export default {
  template: `
    <section class="label-picker">
        <h2>Pick Label</h2>
        <ul class="clean-list">
          <li v-for="label in labels">
            <span class="label-option" :style="{backgroundColor: label.color}" @click="pickLabel(label)">{{ label.title }}</span>
          </li>
        </ul>
    </section>
`,
  data() {
    return {
      labels: [
        { title: 'Critical', color: '#e03131' },
        { title: 'Family', color: '#1971c2' },
        { title: 'Work', color: '#37b24d' },
        { title: 'Friends', color: '#fcc419' },
        { title: 'Spam', color: '#f76707' },
        { title: 'Memories', color: '#ae3ec9' },
        { title: 'Romantic', color: '#1098ad' },
      ],
    }
  },
  created() {},
  methods: {
    pickLabel(label) {
      this.$emit('picked', label)
    },
  },
  computed: {},
  unmounted() {},
}
