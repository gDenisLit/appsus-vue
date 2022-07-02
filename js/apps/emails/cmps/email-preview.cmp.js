import { updateEmit } from "../../../services/eventBus.service.js"

export default {
    template: `
        
        <div v-if="show">
            <i class="fa-solid fa-star" :class="isStarred"  @click.stop="toggleStar"></i>
        </div>
        <div class="preview-data">
            <div class="email-to" :class="unread">{{to}}</div>
            <span class="email-sub" :class="unread">{{email.subject}}</span>
            <span :class="unread">-</span>
            <span class="email-body" ref="body">{{shortBody}}</span>
        </div>
        <span class="sent-at" :class="unread">{{date}}</span>
    `,
    props: [
        'email'
    ],
    data() {
        return {
            
        }
    },
    methods: {
        toggleStar() {
            this.email.starred = ! this.email.starred
            updateEmit(this.email)
        }
    },
    computed: {
        to() {
            if (!this.email.to) return
            const idx = this.email.to.indexOf('@')
            return this.email.to.slice(0, idx)
        },
        shortBody() {
            if (!this.email.body) return
            return this.email.body.slice(0, 80) + '...'
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
        },
        isStarred() {
            return {starred: (this.email.starred)}
        },
    },
    created() {
        
    },
    mounted() {
        
    },
    unmounted() {
 
    },
    components: {
       
    },
}