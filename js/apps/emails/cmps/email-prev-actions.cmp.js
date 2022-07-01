<<<<<<< HEAD
import { removeEmailEmit, toggleIsReadEmit, addNoteEmit } from '../../../services/eventBus.service.js'

=======
import {
  removeEmailEmit,
  readEmailEmit,
  addNoteEmit,
} from '../../../services/eventBus.service.js'
>>>>>>> 66e0d863f1bfb4b4e3536aa4f3d9c3e02ea20b1e

export default {
  template: `
        <section class="email-prev-actions">
            <button class="send-to-note" @click.stop="sendToNote">
                <i class="fa-solid fa-note-sticky"></i>
            </button>
            <button class="read-email" @click.stop="selectRead">
                <i v-if="email.isRead" class="fa-solid fa-envelope-open"></i>
                <i v-else class="fa-solid fa-envelope"></i>
            </button>
            <button class="delete-email" @click.stop="selectDelete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </section>
    `,
  props: ['email'],
  data() {
    return {}
  },
  methods: {
    selectDelete() {
      removeEmailEmit(this.email.id)
    },
<<<<<<< HEAD
    methods: {
        selectDelete() {
            removeEmailEmit(this.email.id)
        },
        selectRead() {
            toggleIsReadEmit(this.email.id)
        },
        sendToNote() {
            const {subject, body} = this.email
            const newNote = {
                type: 'note-txt',
                info: {
                    title: subject || '',
                    body: body || '',
                }
            }
            addNoteEmit(newNote)
=======
    selectRead() {
      readEmailEmit(this.email.id)
    },
    sendToNote() {
      const { subject, body } = this.email
      const newNote = {
        type: 'note-txt',
        info: {
          title: subject || '',
          txt: body || '',
>>>>>>> 66e0d863f1bfb4b4e3536aa4f3d9c3e02ea20b1e
        },
      }
      console.log('adding note..', newNote)
      addNoteEmit(newNote)
    },
  },
  computed: {},
  created() {},
  unmounted() {},
}
