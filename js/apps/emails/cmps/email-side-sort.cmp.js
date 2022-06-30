import { sortEmit } from "../../../services/eventBus.service.js"

export default {
    template: `
        <button class="nav-btn" @click="sort('inbox')" 
            :class="{active: (active === 'inbox')}"
        >
            <i class="fa-solid fa-inbox"></i>
            Inbox
        </button>
        <button class="nav-btn" @click="sort('sent')" 
            :class="{active: (active === 'sent')}"
        >
            <i class="fa-solid fa-paper-plane"></i>    
            Sent
        </button>
        <button class="nav-btn" @click="sort('draft')" 
            :class="{active: (active === 'draft')}"
        >
            <i class="fa-solid fa-file"></i>
            Drafts
        </button>
        <button class="nav-btn" @click="sort('trash')" 
            :class="{active: (active === 'trash')}"
        >
            <i class="fa-solid fa-trash"></i>
            Trash
        </button>
    `,
    data() {
        return {
           active: 'inbox',
        }
    },
    methods: {
        sort(type) {
            this.active = type
            sortEmit(type)
        },  
    },
    computed: {

    },
    created() {
 
    },
    unmounted() {
 
    },
    emits: [
        'sort'
    ]
}