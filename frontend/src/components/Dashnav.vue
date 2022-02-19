<template>
    <main :style="{'width': '300px', 'background': styles.navbar[getMode]}">
        <h1>{{styles.name}}</h1>
        <div class="item" :style="[tab[0] == 1 ? {'background-color': 'rgba(255, 255, 255, 0.322)'} : none]" @click="changeTab(0)">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.42zM8.48 16c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48zM19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
            <p>Account</p>
        </div>
        <div class="item" :style="[tab[1] == 1 ? {'background-color': 'rgba(255, 255, 255, 0.322)'} : none]" @click="changeTab(1)">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/><path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M6,20V4h7v4h5v12H6z M11,19h2v-1h1 c0.55,0,1-0.45,1-1v-3c0-0.55-0.45-1-1-1h-3v-1h4v-2h-2V9h-2v1h-1c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1h3v1H9v2h2V19z"/></g></svg>
            <p>Insurance</p>
        </div>
        <div class="item" :style="[tab[2] == 1 ? {'background-color': 'rgba(255, 255, 255, 0.322)'} : none]" @click="changeTab(2)">
           <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
            <p>Student Hub</p>
        </div>
        <div class="item" :style="[tab[3] == 1 ? {'background-color': 'rgba(255, 255, 255, 0.322)'} : none]" @click="changeTab(3)">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>
            <p>EDU</p>
        </div>
        <div class="item" :style="[tab[4] == 1 ? {'background-color': 'rgba(255, 255, 255, 0.322)'} : none]" @click="changeTab(4)">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 9c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zm7 5.58c-2.53.34-4.93 1.3-7 2.82-2.06-1.52-4.47-2.49-7-2.83v-6.95c2.1.38 4.05 1.35 5.64 2.83L12 14.28l1.36-1.27c1.59-1.48 3.54-2.45 5.64-2.83v6.95z"/></svg>
            <p>Learn</p>
        </div>
        <button class="container" aria-label="Toggle color mode" title="Toggle color mode" @click="toggleDark()">
            <div class="sun visible"></div>
            <div class="moon">
                <div class="star"></div>
                <div class="star small"></div>
            </div>
        </button>
        <div class="item" @click="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
            <p>Logout</p>
        </div>
    </main>
</template>
<script>
import styles from "@/assets/styles.json";

export default {
    name: "Dashnav",
    props:{
        width: String,
    },
    data(){
        return{
            styles: styles,
            dark: this.$store.state.dark,
            tab: [1,0,0,0,0],
            none: ""
        }
    },
    computed:{
        getMode(){
            return this.$store.state.dark;
        }
    },
    methods:{
        changeTab(index){
           
            this.tab.forEach((item, index, array) => {
                array[index] = 0;
            });
            this.tab[index] = 1;
            if(index == 0){
                this.$router.push("/dashboard");
            }else if(index == 1){
                this.$router.push("/dashboard/insurance");
            }else if(index == 2){
                this.$router.push("/dashboard/stuhub");
            }else if(index == 3){
                this.$router.push("/dashboard/edu");
            }else if(index == 4){
                this.$router.push("/dashboard/learn");
            }
        },
        logout(){
            this.$router.push("/");
        },
        toggleDark(){
            this.$store.commit("changeMode");
            this.dark = this.$store.state.dark;
     
        }
    },
    mounted(){
        const sun = document.querySelector('.sun')
        const moon = document.querySelector('.moon')
        const button = document.querySelector('.container')

        button.addEventListener('click', () => {
            sun.classList.toggle('visible');
            moon.classList.toggle('visible');
        })
        this.tab = this.$store.state.tabs;
        console.log("MOUTNED WHEN CHANGE");

    }
}
</script>

<style lang="scss" scoped>
@import "../assets/dark.scss";

main{
    width: 300px;
    height: 100vh;
    // background: #42b983;
    position: relative;
    // background: rgb(80,213,183);
    // background: radial-gradient(circle, rgba(80,213,183,1) 0%, rgba(66,185,131,1) 100%);
    float: left;
}
h1{
    color: white;
    padding-top: 60px;
    padding-bottom: 50px;

}

.item{
    display: flex;
    margin-top: 20px;
    width: 80%;
    float: right;
    align-items: center;
    height: fit-content;
    padding: 10px 0px 10px 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    user-select: none;

    &:hover{
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.322);
    }
    & > p{
        font-size: 20px;
        color: white;
        margin-left: 20px;
        font-weight: 500;
    }
}

div:last-child{
    position: absolute;
    right: 0;
    bottom: 20px;
    width: 60%;

}
</style>