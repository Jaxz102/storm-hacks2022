<template>
    <main class="main">
        <h1>Insurance</h1>
        <img id="img" src="../assets/images/Apple.png" alt="" class="selectable" @mousedown="mouseDown($event)" @mouseup="mouseUp($event)" @mousemove="mouseMove($event)">
        <canvas id="canvas" width="800" height="650" @mousedown="mouseDown($event)" @mouseup="mouseUp($event)" @mousemove="mouseMove($event)"></canvas>

    </main>
</template>
<script>
import styles from "@/assets/styles.json"

export default {
    name: "Insurance",
    
    data(){
        return{
            styles: styles,
            rect: {},
            drag: false,
            startpos: [],
            endpos: [],
            offsetLeft: 0,
            offsetTop: 0

        }
    },
    methods:{
        mouseDown(e){
            // new DragSelect({
            // selectables: document.querySelectorAll('.selectable'),
            // callback: e => console.log(e)
            // });
            // var rect = e.target.getBoundingClientRect();
            // var x = e.clientX - rect.left; //x position within the element.
            // var y = e.clientY - rect.top;  //y position within the element.
            // console.log("Left? : " + x + " ; Top? : " + y + ".");

            this.rect.startX = e.pageX - this.offsetLeft;
            this.rect.startY = e.pageY - this.offsetTop;
            this.drag = true;
        },
        mouseUp(e){
            this.drag = false;
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width,canvas.height);
        },
        mouseMove(e){
            if (this.drag == true) {
                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');

                this.rect.w = (e.pageX - this.offsetLeft) -  this.rect.startX;
                this.rect.h = (e.pageY - this.offsetTop) - this.rect.startY;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                this.draw();
            }
        },
        draw(){
            console.log("DRAW IS CALLED");
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.setLineDash([6]);
            ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
        }
    },
    mounted(){
        this.$store.commit("changeTab", 1);

        let canvas = document.getElementById('canvas');
        this.offsetLeft = canvas.offsetLeft;
        this.offsetTop = canvas.offsetTop;
        

        
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
        padding: 30px 50px;
    }
}

img{
    user-select: none;
}

#canvas{
    background-color: rgba(252, 117, 117, 0.445);
}
</style>