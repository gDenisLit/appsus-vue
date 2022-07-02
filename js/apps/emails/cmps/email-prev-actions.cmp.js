import {
  removeEmit,
  updateEmit,
  integEmit,
} from '../../../services/eventBus.service.js'

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
      removeEmit(this.email.id)
    },
    selectRead() {
      this.email.isRead = !this.email.isRead
      updateEmit(this.email)
    },
    sendToNote() {
      const { subject, body } = this.email
      const newNote = {
        type: 'note-txt',
        info: {
          title: subject || '',
          txt: body || '',
        },
      }
      console.log('adding note..', newNote)
      Promise.resolve(this.$router.push('/keep'))
      .then(() => integEmit(newNote))
      
    },
  },
  computed: {},
  created() {},
  unmounted() {},
}
