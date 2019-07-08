export default {
    state: {
        items: [
            { id: 1, title: 'item 1'},
            { id: 2, title: 'item 2'},
            { id: 3, title: 'item 3'},
        ]
    },
    getters: {
        productList : state => state.items
    }
}