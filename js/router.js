import homePage from "./views/home-page.cmp.js"
import aboutPage from "./views/about-page.cmp.js"
import keepApp from "./apps/keeps/pages/keep-app.cmp.js"
import emailApp from "./apps/emails/pages/email-app.cmp.js"
import emailDetails from "./apps/emails/pages/email-details.cmp.js"
import emailList from "./apps/emails/cmps/email-list.cmp.js"

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/about",
    component: aboutPage,
  },
  {
    path: "/keep",
    component: keepApp,
  },
  {
    path: "/email",
    component: emailApp,
    children: [
      {
        path: "inbox",
        component: emailList,
      },
      {
        path: ":emailId",
        component: emailDetails
      }
    ],
  },
  
  // {
  //   path: '/book',
  //   component: bookApp,
  // },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});
