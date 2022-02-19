<template>

	<main>
		<nav>
			<h1>BankAI</h1>
			<ul>
				<li>Product</li>
				<li>Markets</li>
				<li>Students</li>
				<li>About</li>
			</ul>
			<button @click="login()">LOGIN</button>
		</nav>
		<section>
			<h1 class="heading">Banking built<br>for Students</h1>
			<p class="desc">Helping students to manage and track their finance with AI</p>
		</section>
		
		<img src="../assets/images/frontimg.jpg" alt="banker">
	</main>
</template>

<script>
// @ is an alias to /src


export default {
	name: 'HomeView',
	methods:{
		login(){
			this.$router.push("/login");
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles.scss";

main{
  width: 100%;
  height: 100%;
//   background-color: $bg-colour;
}
nav{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: relative;
	& > h1{
		font-size: 40px;
		padding: 10px 100px;
	}
	& > button{
		background-color: $primary-colour;
		height: fit-content;
		margin-right: 100px;
		padding: 10px 30px;

		&:hover{
			background-color: $primary-hover;
		}
	}
}
ul{
	display: flex;
	flex-direction: row;
	margin-left: 20px;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	
	& > li{
		padding: 0px 30px;
		color: $black;
		font-size: 20px;
		font-weight: 500;
		transition: all .4s;
		&:hover{
			color: $primary-hover;
			cursor: pointer;
		}

	}
}

section{
	width: 50%;
	margin-top: 150px;
	height: fit-content;
	float: left;
}
.heading{
	font-size: 60px;
	padding-left: 100px;
	text-align: left;
	font-weight: 700;

}
.desc{
	padding-left: 100px;
	text-align: left;
	font-size: 30px;
	font-weight: 400;
	

}
img{
	width: 400px;
	float: right;
	margin-right: 150px;
	margin-top: 100px;
}
</style>
