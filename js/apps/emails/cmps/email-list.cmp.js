import emailPreview from "./email-preview.cmp.js"

export default {
    template: `
        <section class="email-container flex column">

            <article class="email-preview flex" v-for="email in emails" 
                @click.native="select(email.id)"
            >
                <email-preview :email="email" />
            </article>
            
        </section>

    `,
    props: [
        'emails'
    ],
    data() {
        return {

        }
    },
    methods: {
        select(email) {
            this.$emit('selected', email)
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
    },
}