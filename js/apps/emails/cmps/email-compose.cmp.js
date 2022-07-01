import { addEmit, showSuccessMsg } from "../../../services/eventBus.service.js"

export default {
    template: `
    <section class="compose-email">
        <div class="compose-title flex space-between">
            <h3>New Message</h3>
            <div>
                <button class="compose-title-btn">
                    <i class="fa-solid fa-window-minimize"></i>
                </button>
                <button class="compose-title-btn">
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                </button>
                <button class="compose-title-btn" @click="saveDraft">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <section class="compose-form flex column">
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
    props: [
        'email'
    ],
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
            showSuccessMsg('Message Sent!')
        },
        saveDraft() {
            if (!this.newEmail.to && !this.newEmail.subject &&
                !this.newEmail.body) {
                    this.$router.replace('/email/inbox')
                    return
                }
            this.newEmail.state = 'draft'
            this.$router.replace('/email/inbox')
            addEmit(this.newEmail)
            showSuccessMsg('Saved to Drafts')
        }
    },
    computed: {
 
    },
    created() {
        if (this.email) this.newEmail = this.email
    },
    unmounted() {
 
    },
}