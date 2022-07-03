import { addEmit } from '../../../services/eventBus.service.js'

export default {
  template: `
    <div class="screen" v-if="isExpand" @click="expand"></div>
    <section class="compose-email" :class="expanded">
        <div class="compose-title flex space-between">
            <h3>New Message</h3>
            <div>
                <button class="compose-title-btn" @click="minimize">
                    <i class="fa-solid fa-window-minimize" v-if="!isMinimize"></i>
                    <i class="fa-solid fa-plus" v-else></i>
                </button>
                <button class="compose-title-btn" @click="expand">
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                </button>
                <button class="compose-title-btn" @click="saveDraft">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <section class="compose-form flex column" v-if="!isMinimize">
            <input type="email" v-model="newEmail.to" 
                placeholder="Recipient" required
            >
            <input type="text" v-model="newEmail.subject"
                placeholder="Subject"
            >
            <textarea v-model="newEmail.body"></textarea>
            <button class="send" @click.prevent="send">Send</button>
        </section>
    </section>
    `,
  props: ['email'],
  data() {
    return {
      newEmail: {
        to: null,
        subject: null,
        body: null,
        sentAt: null,
        state: null,
        starred: false,
      },
      isMinimize: false,
      isExpand: false,
    }
  },
  methods: {
    send() {
      if (!this.newEmail.to) {
        this.saveDraft()
        return
      }
      this.newEmail.state = 'sent'
      this.newEmail.sentAt = Date.now()
      this.$router.replace('/email/inbox')
      addEmit(this.newEmail)
    },
    saveDraft() {
      if (!this.newEmail.to && !this.newEmail.subject && !this.newEmail.body) {
        this.$router.replace('/email/inbox')
        return
      }
      this.newEmail.state = 'draft'
      this.$router.replace('/email/inbox')
      addEmit(this.newEmail)
    },
    minimize() {
      this.isMinimize = !this.isMinimize
      if (this.isExpand) this.isExpand = false
    },
    expand() {
      this.isExpand = !this.isExpand
      if (this.isMinimize) this.isMinimize = false
    },
  },
  computed: {
    expanded() {
      return { expanded: this.isExpand }
    },
  },
  created() {
    if (this.email) this.newEmail = this.email
    const { title, body, to } = this.$route.params
    this.newEmail.to = to ? to : null
    this.newEmail.body = body ? body : null
    this.newEmail.subject = title ? title : null
  },
  unmounted() {},
}
