import { eventBus } from '../../../services/eventBus.service.js'
import { sortEmit } from "../../../services/eventBus.service.js"
import emailCompose from "./email-compose.cmp.js"

export default {
  template: `
      <div :class="collapse">
        <section class="side-nav">
          <div class="side-nav-inner">
            <ul>
              <li>
                <a class="email-compose" 
                      @click="composeMode"
                      @mouseenter="isCollapse = false"
                      @mouseleave="isCollapse = true"
                  >
                    <span class="icon"><i class="fa-solid fa-plus"></i></span>
                    <span class="text">Compose</span>
                  </a>
                </li>
                <li v-for="btn in navBtns" 
                :key="btn.id"
                @mouseenter="isCollapse = false"
                @mouseleave="isCollapse = true"  >
                  <a @click="sort(btn.type)">
                    <span class="icon"><i :class="btn.icon"></i></span>
                    <span class="text">{{btn.title}}</span>
                  </a>
                </li>
            </ul>
          </div>
        </section>
      </div>
      <section v-if="compose" >
            <email-compose @closeCompose="composeMode"/>
      </section>
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
          title: 'Sent',
          type: 'sent',
          icon: ['fa-solid', 'fa-paper-plane'],
        },
        {
          id: 'btn3',
          title: 'Draft',
          type: 'draft',
          icon: ['fa-solid', 'fa-file'],
        },
        {
          id: 'btn4',
          title: 'Trash',
          type: 'trash',
          icon: ['fa-solid', 'fa-trash'],
        },
      ],
      isCollapse: true,
      isAlwaysOpen: false,
      active: 'inbox',
      compose: false,
      sortBy: null,
    }
  },
  components: {},
  methods: {
    toggleSideNav() {
      this.isAlwaysOpen = !this.isAlwaysOpen
    },
    sort(type) {
      this.active = type
      sortEmit(type)
    }, 
    composeMode() {
      this.compose = !this.compose
    },
  },
  computed: {
    collapse() {
      return { 'hover-collapse': this.isCollapse && !this.isAlwaysOpen }
    },
  },
  created() {
    eventBus.on('toggled', this.toggleSideNav)
  },
  unmounted() {

  },
  emits: [
    'send',
    'sort',
  ],
  components: {
    emailCompose,
  },
}

