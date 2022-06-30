export default {
    template: `
        <pre>{{email}}</pre>
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
        'email'
    ],
    data() {
        return {

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
}