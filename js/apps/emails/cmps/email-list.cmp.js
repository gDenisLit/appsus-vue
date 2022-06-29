import emailPreview from "./email-preview.cmp.js"

export default {
    template: `
        <section v-for="email in emails">
            <email-preview @click.native="select(email.id)" :email="email" />
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
    emits: [
        'selected',
    ],
}