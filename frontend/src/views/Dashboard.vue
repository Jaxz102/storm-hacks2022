<template>
    <Dashnav/>
    <router-view></router-view>
</template>
<script>
import styles from "@/assets/styles.json"
import Dashnav from "@/components/Dashnav.vue"
export default {
    name: "Dashbaord",
    components: {
        Dashnav
    },
    data(){
        return{
            navwidth: "300px"
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles.scss";

.main{
    background-color: $bg-colour;
    float: right;
    height: 100%;
    
    & > h1{
        text-align: left;
        padding: 30px 50px;
    }
}
</style>