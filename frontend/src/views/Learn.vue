<template>
    <main class="main" :style="{'background-color': styles.bgcolour[getMode]}">
        <h1 :style="{'color': styles.headertext[getMode]}">Learning Centre</h1>
        <!-- <section class="head">
            <div class="head__balance">
                <h2 class="head__balance--amount">Your Learning Progress</h2>
            </div>

        </section> -->

        <section class="learn">
            <div class="learn__item" v-for="item in videos" :style="{'background-color': styles.transactionbg[getMode], 'border-color': styles.transboxborder[getMode]}">
                <iframe class="learn__item--video" :src="item.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>
                <a :href="item.authorURL" class="learn__item--author" :style="{'color': styles.normaltext[getMode]}">{{item.author}}</a>
                <h2 class="learn__item--title" :style="{'color': styles.headertext[getMode]}">{{item.title}}</h2>
            </div>
            
        </section>
        <footer></footer>
        
    </main>
</template>
<script>
import styles from "@/assets/styles.json"

export default {
    name: "Learn",
    
    data(){
        return{
            styles: styles,
            videos: [],
            
        }
    },
    computed:{
        getMode(){
            return this.$store.state.dark;
        }
    },
    mounted(){
        this.$store.commit("changeTab", 4);
        this.dark = this.$store.state.dark;

        const prom = fetch("http://localhost:3000/learn", {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            data.data.forEach(element => {
                this.videos.push({
                    title: element.title,
                    url: element.videoLink,
                    author: element.author_name,
                    authorURL: element.author_url
                })
            });
        })
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

.learn{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(100% - 200px);
    margin: auto;
    justify-content: center;
    gap: 30px;
    align-items: stretch;
    &__item{
        height: fit-content;
        width: fit-content;
        background-color: white;
        padding: 20px 20px;
        border-radius: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: #4e4e4e4f;
        
        &--video{
            height: 200px;
            width: 400px;

        }
        &--author{
            font-size: 20px;
            width: 400px;
            text-align: left;
            text-decoration: none;

        }
        &--title{
            text-align: left;
            width: 400px;
            height: 100px;
        }
    }
}
</style>