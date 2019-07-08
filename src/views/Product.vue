<template>
    <div>
        {{ products }}
    <h1>{{ productList }}</h1>
    {{isLogged}}
    </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
    computed: {
        productList(){ return this.$store.state.products.items},
        ...mapState({
            products(state){
                return state.products.items
            },
        }),
        ...mapGetters({
           isLogged: 'isLoggedIn' 
        })
    },
    mounted(){
        console.log(this.$store.state.products)
    }
}
</script>
