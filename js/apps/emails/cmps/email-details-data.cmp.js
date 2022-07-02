export default {
    template: `
        <section class="email-details">
            <h1 class="email-sub">{{email.subject}}</h1>
            <div class="from">
                <i class="fa-solid fa-circle-user"></i>
                <span class="email-to">{{from}}</span>
                <span>-</span>
                <span class="sent-at">{{date}}</span>
            </div>
            <p>{{email.body}}</p>
        </section>
 
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
            if (!this.email.to) return
            const idx = this.email.to.indexOf('@')
            return this.email.to.slice(0, idx)
        },
        date() {
            if (!this.email.sentAt) return
            const date = new Date(this.email.sentAt).toString()
            const idx = date.indexOf('GMT')
            return date.slice(0, idx)
        }
    },
    created() {
 
    },
    unmounted() {
 
    },
}