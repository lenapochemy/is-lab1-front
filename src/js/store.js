import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        token: '',
        // coords: null,
        // chapters: null,
        coordinate: {
            id: null,
            x: null,
            y: null
        },
        chapter: {
            id: null,
            name: null,
            parentLegion: null
        },
        spaceMarine: {
            name: '',
            coordinates: {
                id: '',
                x: '',
                y: '',
            },
            chapter: {
                id: '',
                name: '',
                parentLegion: ''
            },
            health: '',
            category: '',
            weaponType: null,
            meleeWeapon: null
        },
    },
    mutations: {
        // setCoords(state, data){
        //     state.coords = data;
        // },
        // setChapters(state, data){
        //     state.chapters = data;
        // },
        setCoord(state, data){
            state.coordinate = data;
        },
        setChapter(state, data){
            state.chapter = data;
        },
        setSpaceMarine(state, data){
            state.spaceMarine = data;
        },
        setToken(state, data){
            state.token = data;
        }
    }
})

export default store;