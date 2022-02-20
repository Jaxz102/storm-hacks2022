<template>
    <main class="main" :style="{'background-color': styles.bgcolour[getMode]}">
        <h1 :style="{'color': styles.headertext[getMode]}">Student Hub</h1>

        <section class="coupon" v-for="item in coupons" :style="{'background-color': styles.transactionbg[getMode], 'border-color': styles.transboxborder[getMode]}">
            <img class="coupon__logo" :src="require(`../assets/images/${item.company}.png`)" alt="">
            <div class="coupon__info">
                <h2 class="coupon__info--title" :style="{'color': styles.headertext[getMode]}">{{item.title}}</h2>
                <p class="coupon__info--time" :style="{'color': styles.normaltext[getMode]}">{{item.prettyDate}} &#x2022 {{item.prettyTime}}</p>
            </div>
            <button class="coupon__copy">{{item.code}}</button>
        </section>
        <footer></footer>
    </main>
</template>
<script>
import styles from "@/assets/styles.json"

export default {
    name: "Stuhub",
    
    data(){
        return{
            styles: styles,
            coupons: []
        }
    },
    computed:{
        getMode(){
            return this.$store.state.dark;
        }
    },
    mounted(){
        this.$store.commit("changeTab", 2);

        const prom = fetch("http://localhost:3000/studenthub/", {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            
            this.coupons = data;
       
        });
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
.coupon{
  
    width: calc(100% - 200px);
    display: flex;
    flex-direction: row;
    margin: auto;
    justify-content: space-between;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    align-items: center;
    margin-top: 20px;
    border-width: 3px;
    border-style: solid;
    
    &__logo{
        height: 100%;
        margin-left: 0px;
    }
    &__info{
        flex-grow: 2;
       
        padding-left: 30px;
        padding-right: 30px;
        &--title{
            text-align: left;
        }
        &--time{
            text-align: left;
        }
    }
    &__copy{
        background-color: #42b983;

        width: 200px;

        margin-right: 30px;
        

        &:hover{
            background-color: #6bedb2;
        }

    }
}
</style>