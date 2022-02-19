<template>
    <main class="main" :style="{'background-color': styles.bgcolour[getMode]}">
        <h1 :style="{'color': styles.headertext[getMode]}">Hello, Jax Wang!</h1>
        <section class="head">
            <div class="head__balance">
                <h2 class="head__balance--title">Balance</h2>
                <h2 class="head__balance--amount">$100,000</h2>
            </div>
            
        </section>
        <section class="transaction"></section>
    </main>
</template>
<script>
import styles from "@/assets/styles.json"

export default {
    name: "Account",
    
    data(){
        return{
            styles: styles,
            navwidth: "300px",
            dark: this.$store.state.dark,
        }
        
    },
    computed:{
        getMode(){
            return this.$store.state.dark;
        }
    },
    mounted(){
        this.$store.commit("changeTab", 0);
        this.dark = this.$store.state.dark;
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles.scss";

.main{
    background-color: $bg-colour;
    float: right;
    height: 100%;
    width: calc(100% - 300px);
    & > h1{
        text-align: left;
        padding: 30px 100px;
        font-size: 50px;
    }
}
.head{
    display: flex;
    flex-direction: row;

    &__balance{
        height: 150px;
        width: 400px;
        background: rgb(80,213,183);
        background: linear-gradient(338deg, rgba(80,213,183,1) 0%, rgba(66,185,131,1) 100%);
        margin-left: 100px;
        border-radius: 20px;
        &--amount{
            font-size: 40px;
            color: white;
            text-align: left;
            padding: 0px 0px 0px 30px;
            font-weight: 500;
        }
        &--title{
            font-size: 30px;
            color: white;
            padding: 20px 0px 0px 30px;
            text-align: left;
            font-weight: 200;

        }

    }
}
</style>