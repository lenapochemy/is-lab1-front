import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        coords: null,
        chapters: null
    },
    mutations: {
        setCoords(state, data){
            state.coords = data;
        },
        setChapters(state, data){
            state.chapters = data;
        }
    }
})

export default store;