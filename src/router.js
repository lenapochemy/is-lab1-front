import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import StartView from "@/views/StartView.vue";
import MainView from "@/views/MainView.vue";
import AddChapterComponent from "@/components/AddChapterComponent.vue";
import AddCoordinateComponent from "@/components/AddCoordinateComponent.vue";
import AddSpaceMarineComponent from "@/components/AddSpaceMarineComponent.vue";
import UpdateCoordinatesComponent from "@/components/UpdateCoordinatesComponent.vue";
import UpdateChapterComponent from "@/components/UpdateChapterComponent.vue";
import UpdateSpaceMarineComponent from "@/components/UpdateSpaceMarineComponent.vue";

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
        },
        {
            path: '/addChapter',
            name: 'add-chapter-page',
            component: AddChapterComponent,
        },
        {
            path: '/addCoordinate',
            name: 'add-coordinate-page',
            component: AddCoordinateComponent
        },
        {
            path: '/addSpaceMarine',
            name: 'add-space-marine-page',
            component: AddSpaceMarineComponent
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