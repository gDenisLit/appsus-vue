import emailPreview from "./email-preview.cmp.js"
import emailPrevActions from "./email-prev-actions.cmp.js"

export default {
    template: `
        <section class="email-container flex column">
            <article class="email-preview flex" v-for="email in emails" 
                @click.native="select(email.id)" 
            >
                <email-preview :email="email" />
                <email-prev-actions @selectedDel="onDelete" :emailId="email.id"/>
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
        select(email) {
            this.$emit('selected', email)
        },
        onDelete(emailId) {
            this.$emit('delete', emailId)
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