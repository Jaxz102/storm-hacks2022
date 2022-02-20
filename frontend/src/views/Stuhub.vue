<template>
    <main class="main">
        <h1>Student Hub</h1>
        <section class="head">
            <div class="head__balance">
                <h2 class="head__balance--amount">Your Hub</h2>
            </div>

        </section>
    </main>
</template>
<script>
import styles from "@/assets/styles.json"

export default {
    name: "Stuhub",
    
    data(){
        return{
            navwidth: "300px"
        }
    },
    mounted(){
        this.$store.commit("changeTab", 2);
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
        height: 200px;
        width: 400px;
        background: rgb(80,213,183);
        background: linear-gradient(338deg, rgba(80,213,183,1) 0%, rgba(66,185,131,1) 100%);
        margin-left: 100px;
        border-radius: 20px;
        &--amount{
            font-size: 30px;
            color: white;
        }

    }
}
</style>