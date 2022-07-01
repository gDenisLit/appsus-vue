import { eventBus } from '../../../services/eventBus.service.js'
import { filterEmit } from "../../../services/eventBus.service.js"
import emailCompose from "./email-compose.cmp.js"

export default {
  template: `
      <div :class="collapse" 
        @mouseenter="isCollapse = false"
        @mouseleave="isCollapse = true"
      >
        <section class="side-nav">
          <div class="side-nav-inner">
            <ul>
              <li>
                <a class="email-compose" 
                      @click="composeMode"  
                  >
                    <span class="icon"><i class="fa-solid fa-plus"></i></span>
                    <span class="text">Compose</span>
                  </a>
                </li>
                <li v-for="btn in navBtns" 
                :key="btn.id"
                >
                  <a @click="filter(btn.type)">
                    <span class="icon"><i :class="btn.icon"></i></span>
                    <span class="text">{{btn.title}}</span>
                  </a>
                </li>
            </ul>
          </div>
        </section>
      </div>
          `,
  data() {
    return {
      navBtns: [
        {
          id: 'btn1',
          title: 'Inbox',
          type: 'inbox',
          icon: ['fa-solid', 'fa-inbox'],
        },
        {
          id: 'btn2',
          title: 'Starred',
          type: 'starred',
          icon: ['fa-solid', 'fa-star'],
        },
        {
          id: 'btn3',
          title: 'Sent',
          type: 'sent',
          icon: ['fa-solid', 'fa-paper-plane'],
        },
        {
          id: 'btn4',
          title: 'Draft',
          type: 'draft',
          icon: ['fa-solid', 'fa-file'],
        },
        {
          id: 'btn5',
          title: 'Trash',
          type: 'trash',
          icon: ['fa-solid', 'fa-trash'],
        },
      ],
      isCollapse: true,
      isAlwaysOpen: false,
      active: 'inbox',
      sortBy: null,
      emailToEdit: null,
    }
  },
  components: {},
  methods: {
    toggleSideNav() {
      this.isAlwaysOpen = !this.isAlwaysOpen
    },
    filter(type) {
      this.active = type
      filterEmit(type)
      this.$router.push('inbox')
    }, 
    composeMode() {
      this.$router.replace('/email/inbox/compose')
    },
  },
  computed: {
    collapse() {
      return { 'hover-collapse': this.isCollapse && !this.isAlwaysOpen }
    },
  },
  created() {
    eventBus.on('toggled', this.toggleSideNav)
    eventBus.on('edit', this.editMode)
  },
  unmounted() {

  },
  emits: [
    'send',
    'sort',
  ],
  components: {
  },
}

