import { addNoteEmit } from '../../../../services/eventBus.service.js'

export default {
  template: `
      <section class="note-add">
        <div class="add-note-txt flex">
          <input v-model="note.info.title" type="text" placeholder="Title">
          <div v-for="(todo, idx) in todos" class="flex space-between" :key="todo.id"> 
              <div>
                <input v-if="todo.txt" type="checkbox" v-model="todo.isDone" >
                <span v-else>+</span>
                <input 
                type="text" 
                v-model="todo.txt"  
                @input.once="addListItem"
                placeholder="List item">
              </div>
              <span v-if="todo.txt" @click="removeTodo(idx)">x</span>
          </div>
          <button @click="addNote">Add</button>
        </div>
      </section>

  `,
  data() {
    return {
      note: {
        type: 'note-todos',
        info: {
          todos: null,
          title: '',
        },
      },
      id: 101,
      todos: [{ id: this.id, txt: '', isDone: false, doneAt: null }],
    }
  },
  created() {},
  methods: {
    addNote() {
      this.todos.pop()
      this.note.info.todos = this.todos
      addNoteEmit(this.note)
      this.$emit('added')
    },
    addListItem() {
      this.todos.push({ id: this.id++, txt: '', isDone: false, doneAt: null })
    },
    removeTodo(idx) {
      this.todos.splice(idx, 1)
    },
  },
  computed: {},
  unmounted() {},
}
