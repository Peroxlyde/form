<template>
  <div class="box">
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="text" id="username" v-model="username" required placeholder="username"/>
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" required placeholder="password"/>
      </div>
      <div class="form-group">
        <button type="submit">Login</button>
      </div>
    </form>
    <div class="other-container">
      <div class="test-button">
        <button @click="test">test</button>
      </div>
      <div class="test-button">
        <button @click="goTo">view form</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
//import {useRouter} from "vue-router";
export default {
  data() {
    return {
      username: '',
      password: '',
      passTest: false
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("https://testapi.gusarea.com/v1/public/auth/login", {userName: this.username, password: this.password});
      //console.log(data.token)
      localStorage.setItem('refreshtoken',response.data.token.refreshToken)
      localStorage.setItem('accesstoken',response.data.token.accessToken)
      localStorage.setItem('user',response.data.member.userName)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.accessToken}`;
      alert("Login Successful.");
    },
    async test() {
      //const router = useRouter();
      const res = await axios.post("https://testapi.gusarea.com/v1/private/question/test");
      console.log(res)
      
      if(res.status==200){
        this.passTest = true
        alert("Pass.");
      }
      //console.log(localStorage.getItem('refreshtoken'))
       //this.$router.push('/form');
    },
     goTo() {
      if(this.passTest){
        this.$router.push('/form');
      }
      else{
        alert("Please Login first.")
      }
      
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 7rem;
  background-color: rgb(255, 246, 233);
  box-shadow: 0 0.5px 3px rgba(48, 48, 48, 0.459);
  width: 25rem;
  border-radius: 50px;
}

.form-group {
  margin-bottom: 10px;
}
.test-button{
  margin-bottom: 10px
}
.other-container{
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding: 20px;
}
.box{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>