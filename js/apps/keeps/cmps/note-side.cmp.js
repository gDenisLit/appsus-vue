import { eventBus } from '../../../services/eventBus.service.js'

export default {
  template: `
      <div :class="collapse">
        <section class="side-nav">
          <div class="side-nav-inner">
            <ul>
                <li v-for="btn in navBtns" 
                :key="btn.id"
                @mouseenter="isCollapse = false"
                @mouseleave="isCollapse = true"  >
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
          title: 'Notes',
          type: 'all',
          icon: ['fa-solid', 'fa-lightbulb'],
        },
        {
          id: 'btn2',
          title: 'Text',
          type: 'note-txt',
          icon: ['fa-solid', 'fa-file-lines'],
        },
        {
          id: 'btn3',
          title: 'Images',
          type: 'note-img',
          icon: ['fa-solid', 'fa-images'],
        },
        {
          id: 'btn4',
          title: 'Videos',
          type: 'note-video',
          icon: ['fa-brands', 'fa-youtube'],
        },
        {
          id: 'btn5',
          title: 'Todos',
          type: 'note-todos',
          icon: ['fa-solid', 'fa-list-ul'],
        },
        {
          id: 'btn6',
          title: 'Audios',
          type: 'note-audio',
          icon: ['fa-solid', 'fa-volume-high'],
        },
      ],
      isCollapse: true,
      isAlwaysOpen: false,
    }
  },
  components: {},
  methods: {
    toggleSideNav() {
      this.isAlwaysOpen = !this.isAlwaysOpen
    },
    filter(type) {
      const filterBy = { type }
      this.$emit('filtered', filterBy)
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
  unmounted() {},
}
