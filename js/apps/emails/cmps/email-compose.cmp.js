import { addEmit } from "../../../services/eventBus.service.js"

export default {
    template: `
        <form class="compose-email">
            <h3>New Message</h3>
            <p>
                <span>From</span>
                <span>{{user}}</span>
            </p>
            <p>
                <span>To</span>
                <input type="email" id="email" v-model="newEmail.to" required>
            </p>
            <p>
                <span>Subject</span>
                <input type="text" v-model="newEmail.subject">
            </p>
            <p>
                <textarea v-model="newEmail.body"></textarea>
            </p>
            <button @click.prevent="send">Send</button>
        </form>
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
            user: 'denislit@gmail.com'
        }
    },
    methods: {
        send() {
            this.newEmail.state = 'sent'
            this.newEmail.sentAt = Date.now()
            this.$emit('closeCompose')
            addEmit(this.newEmail)
        },
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
}