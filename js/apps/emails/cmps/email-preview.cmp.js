import { starEmit } from "../../../services/eventBus.service.js"

export default {
    template: `
        <div v-if="show">
            <input type="checkbox" @click.stop="toggleStar" v-model="isStar">
        </div>
        <span class="email-to" :class="unread">{{to}}</span>
        <span class="email-sub-body" :class="unread">{{email.subject}} -</span>
        <span>{{shortBody}}</span>
        <span class="sent-at" :class="unread">{{date}}</span>
    `,
    props: [
        'email'
    ],
    data() {
        return {
            isStar: false,
        }
    },
    methods: {
        toggleStar() {
            this.isStar = !this.isStar
            starEmit(this.email.id)
        }
    },
    computed: {
        to() {
            if (!this.email.to) return
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
            return {unread: (!this.email.isRead && this.email.state === 'inbox')}
        },
        show() {
            return (this.email.state !== 'trash')
        }
    },
    created() {
 
    },
    unmounted() {
 
    },
    components: {
       
    },
}