import { eventBus } from '../../../services/eventBus.service.js'
import emailPreview from "./email-preview.cmp.js"
import emailPrevActions from "./email-prev-actions.cmp.js"

export default {
    template: `
        <section class="email-container flex column" :class="size">
            <article class="emails-preview flex" v-for="email in emails" 
                @click.native="select(email.id)" 
            >
                <email-preview :email="email" />
                <email-prev-actions :email="email"/>
            </article>
        </section>

    `,
    props: [
        'emails'
    ],
    data() {
        return {
            isSideNav: false,
        }
    },
    methods: {
        select(emailId) {
            this.$emit('selected', emailId)
        },
        toggleSideNav() {
            this.isSideNav = !this.isSideNav
        },
    },
    computed: {
        size() {
            return {'open-side': (this.isSideNav)}
        }
    },
    created() {
        eventBus.on('toggled', this.toggleSideNav)
    },
    unmounted() {
 
    },
    components: {
        emailPreview,
        emailPrevActions,
    },
}