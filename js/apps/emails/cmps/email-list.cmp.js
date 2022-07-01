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
        'emails',
        'isSideNav'
    ],
    data() {
        return {

        }
    },
    methods: {
        select(emailId) {
            this.$emit('selected', emailId)
        },
    },
    computed: {
        size() {
            return {'open-side': (this.isSideNav)}
        }
    },
    created() {

    },
    unmounted() {
 
    },
    components: {
        emailPreview,
        emailPrevActions,
    },
}