import { removeEmit } from '../../../services/eventBus.service.js'

export default {
    template: `
        <section class="email-prev-actions">
            <button class="delete-email" @click.stop="select">
                <i class="fa-solid fa-trash"></i>
            </button>
            <button class="read-email" @click.stop="select">
                <i v-if="" class="fa-solid fa-envelope-open"></i>
                <i class="fa-solid fa-envelope"></i>
            </button>

        </section>
    `,
    props: [
        'email'
    ],
    data() {
        return {
            isRead: null,
        }
    },
    methods: {
        select() {
            removeEmit(this.email.id)
        }, 
    },
    computed: {
 
    },
    created() {
        
    },
    unmounted() {
 
    },
}