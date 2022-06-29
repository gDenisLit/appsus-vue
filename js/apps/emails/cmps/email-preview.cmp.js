export default {
    template: `
        <article class="email-preview flex">
            <span class="email-to" :class="unread">{{from}}</span>
            <span class="email-sub" :class="unread">{{email.subject}}</span>
            <span>- {{shortBody}}</span>
            <span class="sent-at" :class="unread">{{date}}</span>
        </article>
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
        shortBody() {
            return this.email.body.slice(0, 150) + '...'
        },
        date() {
            var date = new Date(this.email.sentAt).toString()
                .split(' ').splice(1, 2).join(' ')
            return date
        },
        unread() {
            return {unread: (!this.email.isRead)}

        },
    },
    created() {
 
    },
    unmounted() {
 
    },
}