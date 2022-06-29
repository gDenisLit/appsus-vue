export default {
    template: `
        <section class="side-nav flex column">
            <button class="email-compose">+Compose</button>
            <button class="nav-btn">Inbox</button>
            <button class="nav-btn">Starred</button>
            <button class="nav-btn">Sent</button>
            <button class="nav-btn">Drafts</button>
            <button class="nav-btn">Trash</button>
        </section>
        <section>
            <form class="compose-email">
                <h3>New Message</h3>
                <p>
                    <span>From</span>
                    <span>{{newEmail.from}}</span>
                </p>
                <p>
                    <span>To</span>
                    <input type="email" id="email" required>
                </p>
                <p>
                    <span>Subject</span>
                    <input type="text" v-model="newEmail.subject">
                </p>
                <p>
                    <textarea v-model="newEmail.body"></textarea>
                </p>
                <button @click.prevent="sendEmail">Send</button>
            </form>
        </section>
    `,
 
    data() {
        return {
            newEmail: {
                from: 'Denis Lit',
                to: '',
                subject: '',
                body: '',
                sentAt: null,
            }
        }
    },
    methods: {
        sendEmail() {
            this.newEmail.sentAt = Date.now()
            this.$emit('send', this.newEmail)
        }
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
    emits: [
        'send'
    ],
}