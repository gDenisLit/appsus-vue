export default {
    template: `
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
            <button @click.prevent="send">Send</button>
        </form>
    `,
 
    data() {
        return {
            newEmail: {
                from: 'Denis Lit',
                to: '',
                subject: '',
                body: '',
                sentAt: null,
            },
        }
    },
    methods: {
        send() {
            this.newEmail.sentAt = Date.now()
            this.$emit('newEmail', this.newEmail)
        },
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
}