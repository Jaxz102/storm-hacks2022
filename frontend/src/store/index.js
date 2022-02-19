import { createStore } from 'vuex'

export default createStore({
	state: {
		dark: 0,
		tabs: [1,0,0,0,0]
	},
	getters: {
	},
	mutations: {
		changeMode(state){
			state.dark += 1;
			state.dark %= 2;
		},
		changeTab(state, num){
			state.tabs.forEach((item, index, array) => {
				array[index] = 0;
			});
			state.tabs[num] = 1;

		}
	},
	actions: {
	},
	modules: {
	}
})
