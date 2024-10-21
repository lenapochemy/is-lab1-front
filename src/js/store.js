import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        coords: null,
        chapters: null,
        coordinate: {
            id: null,
            x: null,
            y: null
        }
    },
    mutations: {
        setCoords(state, data){
            state.coords = data;
        },
        setChapters(state, data){
            state.chapters = data;
        },
        setCoordX(state, data){
            state.coordinate.x = data;
        },
        setCoordY(state, data){
            state.coordinate.y = data;
        },
        setCoordId(state, data){
            state.coordinate.id = data;
        },
    }
})

export default store;