import { updateEmit } from '../../../../services/eventBus.service.js'

export default {
  props: ['note'],
  template: `
      <section class="note-todos">
          <h3>{{ info.title }}</h3>
          <ul class="clean-list">
            <li v-for="(todo, idx) in info.todos" class="flex space-between">
              <span :class="{ done: todo.isDone }" @click="toggleIsDone(idx)">{{ todo.txt }}</span>
              <span @click="removeTodo(idx)">x</span>
            </li>
          </ul>
          <input v-model="txtInput" type="text" placeholder="what to do.." @keyup.enter="addTodo">
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
      const newNote = this.cloneNote()
      const todo = {
        isDone: false,
        txt: this.txtInput,
        doneAt: null,
      }

      newNote.info.todos.push(todo)

      updateEmit(newNote)

      this.txtInput = ''
    },
    removeTodo(idx) {
      const newNote = this.cloneNote()
      newNote.info.todos.splice(idx, 1)
      updateEmit(newNote)
    },
    toggleIsDone(idx) {
      const newNote = this.cloneNote()
      newNote.info.todos[idx].isDone = !newNote.info.todos[idx].isDone
      updateEmit(newNote)
    },
    cloneNote() {
      return JSON.parse(JSON.stringify(this.note))
    },
  },
  computed: {
    info() {
      return this.note.info
    },
  },
  unmounted() {},
}
