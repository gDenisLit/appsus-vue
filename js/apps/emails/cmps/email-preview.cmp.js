export default {
    template: `
        <article class="email-preview">
            <span class="email-to">{{from}}</span>
            <span class="email-sub">{{email.subject}}</span>
            <span class="">{{shortBody}}</span>
            <span>{{date}}</span>
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
            return this.email.body.slice(0, 80) + '...'
        },
        date() {
            var date = new Date(this.email.sentAt).toString()
                .split(' ').splice(1, 2).join(' ')
            return date
        },
    },
    created() {
 
    },
    unmounted() {
 
    },
}