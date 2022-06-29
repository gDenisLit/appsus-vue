export default {
  props: ['info'],
  template: `
      <section class="note-todos">
          <h3>{{ info.label }}</h3>
          <ul>
            <li v-for="todo in info.todos">{{ todo.txt }}</li>
          </ul>
      </section>
      
      `,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
