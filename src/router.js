import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
//importing store so can access action within store.

Vue.use(Router)

//nb: store new Router object in const object to enable use of global guards.
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        //this runs after the global beforeEach which starts the progress bar.
        //the dispatch fetchEvent action by sending id of the event to fetch
        //nb: fetch event must return a promise.
        store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
          next()
        })
      }
    }
  ]
})

router.beforeEach((reoutTo, routeFrom, next) => {
  //start progress bar when routing begins
  NProgress.start()
  next()
})

router.afterEach(() => {
  //finish the progress bar when routing is about to end
  NProgress.done()
})

export default router
