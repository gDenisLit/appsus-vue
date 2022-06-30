import { removeEmit } from '../../../services/eventBus.service.js'

export default {
    template: `
        <section class="email-prev-actions">
            <button class="delete-email" @click.stop="select">
                <i class="fa-solid fa-trash"></i>
            </button>
        </section>
    `,
    props: [
        'emailId'
    ],
    data() {
        return {}
    },
    methods: {
        select() {
            removeEmit(this.emailId)
        }, 
    },
    computed: {
 
    },
    created() {
 
    },
    unmounted() {
 
    },
}