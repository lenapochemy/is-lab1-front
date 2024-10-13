import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import StartView from "@/views/StartView.vue";
import MainView from "@/views/MainView.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'start-page',
            component: StartView
        },
        {
            path: '/main',
            name: 'main-page',
            component: MainView,
            // beforeEnter: (to, from, next) => {
            //     (localStorage.getItem("userToken") !== null) ? next() : next({name: 'start-page'})
            // }
        }
    ]
})

export default router;