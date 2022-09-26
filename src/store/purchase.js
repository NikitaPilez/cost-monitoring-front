export default {
    state: {
        purchaseFilter: {
            search: ""
        }
    },
    mutations: {
        SET_PURCHASE_FILTER(state, purchaseFilter) {
            state.purchaseFilter = purchaseFilter;
        },
    },
    actions: {
        purchaseFilter({ commit }, payload) {
            commit("SET_PURCHASE_FILTER", payload);
        },
    }
}
