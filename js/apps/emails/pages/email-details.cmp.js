import { emailService } from "../services/email.service.js"

export default {
    template: `
        <h1>selcted email</h1>
        <p>
            <span>From: </span>
            <span class="email-to">{{from}}</span>
        </p>
        <p>
            <span>Subject: </span>
            <span class="email-sub">{{email.subject}}</span>
        </p>
        <p>
            <span>Date: </span>
            <span class="sent-at">{{email.sentAt}}</span>
        </p>
        <pre>{{email.body}}</pre>
    `,
    props: [
       
    ],
    data() {
        return {
            email: null,
        }
    },
    methods: {
           
    },
    computed: {
        from() {
            const idx = this.email.to.indexOf('@')
            return this.email.to.slice(0, idx)
        },
    },
    created() {

    },
    unmounted() {
 
    },
    watch: {
        '$route.params.emailId': {
            handler() {
                const id = this.$route.params.emailId
                if (!id) return 
                this.email = emailService.get(id)
            },
            immediate: true,
        }
    },
}