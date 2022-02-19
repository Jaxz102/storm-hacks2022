import { createStore } from 'vuex'

export default createStore({
	state: {
		dark: 0
	},
	getters: {
	},
	mutations: {
		changeMode(state){
			state.dark += 1;
			state.dark %= 2;
		}
	},
	actions: {
	},
	modules: {
	}
})
