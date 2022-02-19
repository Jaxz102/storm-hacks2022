<template>
    <main>
        <h1>Log In</h1>
        <input type="username" placeholder="Your Username" required>
        <input type="password" placeholder="Password" required>
        <button @click="login()">Log In</button>
    </main>
</template>
<script>


export default {
    name: "Login",
    methods: {
        login(){
            this.$router.push("/dashboard/account");
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/styles.scss";

main{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: $primary-colour;

}
h1{
    width: clamp(200px, 400px, 500px);
    text-align:left;
    color: white;
    margin: auto;
    font-size: 50px;
    margin-top: 10%;

}
input{
    margin: auto;
    margin-top: 20px;
    width: clamp(200px, 400px, 500px);
}

button{
    width: clamp(150px, 200px, 300px);
    background-color: #2f9969;
    margin: auto;
    margin-top: 20px;

    &:hover{
        background-color: $primary-hover;
    }

}
</style>
