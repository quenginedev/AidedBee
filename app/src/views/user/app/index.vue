<template>
    <div>
        App Home
        {{token}}
        <v-btn @click="logout">Log out</v-btn>
    </div>
</template>
<script>
export default {
    watch: {
        token(val){
            if(!val){
                // Do something 
            }
        }
    },
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token')
        }
    },
}
</script>