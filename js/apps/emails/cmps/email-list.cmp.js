import emailPreview from "./email-preview.cmp.js"
import emailPrevActions from "./email-prev-actions.cmp.js"

export default {
    template: `
        <section class="email-container flex column">
            <article class="emails-preview flex" v-for="email in emails" 
                @click.native="select(email.id)" 
            >
                <email-preview :email="email" />
                <email-prev-actions :emailId="email.id"/>
            </article>
        </section>

    `,
    props: [
        'emails'
    ],
    data() {
        return {}
    },
    methods: {
        select(emailId) {
            this.$emit('selected', emailId)
        },
    },
    computed: {
 
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