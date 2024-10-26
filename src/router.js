import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import StartView from "@/views/StartView.vue";
import UpdateCoordinatesComponent from "@/components/update/UpdateCoordinatesComponent.vue";
import UpdateChapterComponent from "@/components/update/UpdateChapterComponent.vue";
import UpdateSpaceMarineComponent from "@/components/update/UpdateSpaceMarineComponent.vue";

import Menu from "@/views/Menu.vue";

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
            name: 'menu-page',
            component: Menu,
            beforeEnter: (to, from, next) => {
                (localStorage.getItem("userToken") !== null) ? next() : next({name: 'start-page'})
            }
        },
        {
            path: '/updateCoordinate',
            name: 'update-coordinate-page',
            component: UpdateCoordinatesComponent
        },
        {
            path: '/updateChapter',
            name: 'update-chapter-page',
            component: UpdateChapterComponent
        },
        {
            path: '/updateSpaceMarine',
            name: 'update-space-marine-page',
            component: UpdateSpaceMarineComponent
        },

    ]
})

export default router;