import { updateNoteEmit } from '../../../services/eventBus.service.js'

export default {
  props: ['info'],
  template: `
      <section class="note-todos">
          <h3>{{ info.label }}</h3>
          <ul class="clean-list">
            <li v-for="todo in info.todos">{{ todo.txt }}</li>
          </ul>
          <input type="text" placeholder="what to do.." @keyup.enter="addTodo">
      </section>
      
      `,
  data() {
    return {
      txtInput: '',
    }
  },
  created() {},
  methods: {
    addTodo() {
      console.log('Hi')
    },
  },
  computed: {
    info() {
      return this.note.info
    },
  },
  unmounted() {},
}
