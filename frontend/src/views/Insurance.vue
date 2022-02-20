<template>
    <main class="main">
        <h1>Insurance</h1>
        <!-- <img id="img" src="../assets/images/Apple.png" alt="" class="selectable"> -->
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="mouseDown($event)" @mouseup="mouseUp($event)" @mousemove="mouseMove($event)">
            
        </canvas>
        <img :src="require(`../../../backend/public/${imagesrc}`)" alt="">
        <section class="upload__form">
                <input type="file" id="photoinput">
                <button class="upload__form--button" @click="uploadFile()">Upload</button>
        </section>
    </main>
</template>
<script>
import styles from "@/assets/styles.json"

export default {
    name: "Insurance",
    //    ../../../backend/public/insuranceUploads/a64b4fe3-8e95-4618-bbb8-05d91e95a242.png
    data(){
        return{
            styles: styles,
            rect: {},
            drag: false,
            startpos: [],
            endpos: [],
            offLeft: 0,
            offTop: 0,
            canvas: null,
            ctx: null,
            canvasHeight: "400",
            canvasWidth: "350",
            imagesrc: "insuranceUploads/a64b4fe3-8e95-4618-bbb8-05d91e95a242.png"
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

            this.rect.startX = e.pageX - this.offLeft;
            this.rect.startY = e.pageY - this.offTop;
            this.drag = true;
        },
        mouseUp(e){
            this.drag = false;
            // let canvas = document.getElementById('canvas');
            // let ctx = canvas.getContext('2d');
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        },
        mouseMove(e){
            if (this.drag == true) {
                // let canvas = document.getElementById('canvas');
                // let ctx = canvas.getContext('2d');
           
                this.rect.w = (e.pageX - this.offLeft) -  this.rect.startX;
                this.rect.h = (e.pageY - this.offTop) - this.rect.startY;
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.draw();
            }
        },
        draw(){
        
            // let canvas = document.getElementById('canvas');
            // let ctx = canvas.getContext('2d');
            this.ctx.setLineDash([6]);
            this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
        },
        uploadFile(){
            console.log("1");
			let input = document.getElementById("photoinput");
            console.log("2");

            const fd = new FormData();
            console.log("3");
            fd.append('myFile', input.files[0]);
            console.log("4");
			const prom = fetch('http://localhost:3000/insurance/insuranceUpload', {
        		method: 'POST',
        		body: fd
    		}).then(res => res.json()).then(data => {
				console.log(data);
                console.log(data.imagePath);
                this.imagesrc = data.imagePath;
                console.log("HIII")
                console.log(this.imagesrc)
			})
			.catch(err => console.error(err));
		},
        // fileChange(e){
        //     let files = e.target.files
        //     let formData = new FormData()
        //     formData.append('insuranceFile', files[0])

        //     const prom = fetch('http://localhost:3000/insurance/uploadInsurance', {
			
        // 		method: 'POST',
        //         headers: {'Content-Type': 'multipart/form-data'},
        // 		body: formData
    	// 	}).then(res => res.json()).then(data => {
        //         // console.log(data.type);
		// 		// console.log(data.json());
        //         // console.log(data.imagePath);
        //         // this.imagesrc = data.imagePath;
        //         // console.log("HIII")
        //         // console.log(this.imagesrc)
		// 	}).catch(err => console.error(err));


        // }
    },
    mounted(){
        this.$store.commit("changeTab", 1);

        let canvas = document.getElementById('canvas');
        this.offLeft = canvas.offsetLeft;
        this.offTop = canvas.offsetTop;
        console.log(this.offLeft);
        console.log(this.offTop);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        

        
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
    height: 400px;
    width: 200px;
}

#canvas{
    background-color: rgba(252, 117, 117, 0.445);
    margin-top: 20px;
    margin-left: 20px;
 
}
</style>