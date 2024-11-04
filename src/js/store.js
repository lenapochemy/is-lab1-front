import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        token: '',
        login: '',
        // coords: null,
        // chapters: null,
        spaceMarines: null,
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
        },
        setLogin(state, data){
            state.login = data;
        },
    }
})

export default store;