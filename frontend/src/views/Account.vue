<template>
    <main class="main" :style="{'background-color': styles.bgcolour[getMode]}">
        <h1 :style="{'color': styles.headertext[getMode]}">Hello, Jax Wang!</h1>
        <section class="head">
            <div class="head__balance">
                <h2 class="head__balance--title">Balance</h2>
                <h2 class="head__balance--amount">$100,000</h2>
            </div>
            
        </section>
        <section class="transaction" :style="{'background-color': styles.transactionbg[getMode], 'border-color': styles.transboxborder[getMode]}">
            <div class="transaction__title" :style="{'border-bottom-color': styles.transborder[getMode]}">
                <p class="transaction__title--prop date" :style="{'color': styles.headertext[getMode]}">Date</p>
                <p class="transaction__title--prop name" :style="{'color': styles.headertext[getMode]}">Name</p>
                <p class="transaction__title--prop amount" :style="{'color': styles.headertext[getMode]}">Amount</p>
                <p class="transaction__title--prop balance" :style="{'color': styles.headertext[getMode]}">Balance</p>
            </div>
            <div class="transaction__item" v-for="item in transactions" :style="{'border-bottom-color': styles.transborder[getMode]}">
                <p class="transaction__item--prop date" :style="{'color': styles.normaltext[getMode]}">{{item.prettyDate}}}</p>
                <p class="transaction__item--prop name" :style="{'color': styles.normaltext[getMode]}">{{item.transactionName}}</p>
                <p class="transaction__item--prop amount" :style="{'color': styles.normaltext[getMode]}">{{item.amount}}</p>
                <p class="transaction__item--prop balance" :style="{'color': styles.normaltext[getMode]}">-$50.00</p>
            </div>
        </section>
        <footer></footer>
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
            transactions: [""]
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

        const prom = fetch("http://localhost:3000/account/", {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            console.log(data.data);
            this.transactions = data.data;
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
    overflow: scroll;
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

.transaction{

    
    width: calc(100% - 200px);
    margin: auto;
    background-color: white;
    padding: 20px 20px;
    margin-top: 40px;
    border-radius: 20px;
    // box-shadow: 0px 0px 5px 0px rgba(158, 158, 158, 0.39);
    
    border-width: 3px;
    border-style: solid;


    &__title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        border-bottom-width: 1px;
        border-bottom-style: solid;
        
        

        &--prop{
            font-size: 20px;
            font-weight: 500;
            text-align: left;
     

        }
    }

    &__item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        height: 80px;
        align-items: center;

        &--prop{
            font-size: 15px;
            text-align: left;
     
        }
    }

}

.date{
    flex: 1.5;
    padding: 0px 20px 0px 0px;
}
.name{
    flex: 1;
}
.amount{
    flex: 1;
}
.balance{
    flex: 1;
}

footer{
    width: 100%;
    height: 50px;
    visibility: hidden;
}
</style>