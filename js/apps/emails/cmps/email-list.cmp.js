import emailPreview from "./email-preview.cmp.js"

export default {
    template: `
        <section v-for="email in emails">
            <email-preview :email="email" />
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