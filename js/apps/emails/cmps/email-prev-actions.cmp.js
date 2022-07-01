import { removeEmailEmit, readEmailEmit } from '../../../services/eventBus.service.js'


export default {
    template: `
        <section class="email-prev-actions">
            <button class="read-email" @click.stop="selectRead">
                <i v-if="email.isRead" class="fa-solid fa-envelope-open"></i>
                <i v-else class="fa-solid fa-envelope"></i>
            </button>
            <button class="delete-email" @click.stop="selectDelete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </section>
    `,
    props: [
        'email'
    ],
    data() {
        return {
            
        }
    },
    methods: {
        selectDelete() {
            removeEmailEmit(this.email.id)
        },
        selectRead() {
            readEmailEmit(this.email.id)
        },
    },
    computed: {
 
    },
    created() {
        
    },
    unmounted() {
 
    },
}