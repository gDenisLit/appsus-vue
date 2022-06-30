import { addEmit } from "../../../services/eventBus.service.js"

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
 
    data() {
        return {
            newEmail: {
                to: null,
                subject: null,
                body: null,
                sentAt: null,
                state: null,
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
            this.$emit('closeCompose')
            addEmit(this.newEmail)
        },
        saveDraft() {
            this.newEmail.state = 'draft'
            this.$emit('closeCompose')
            addEmit(this.newEmail)
        }
        
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
}