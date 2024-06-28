<template>
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
    <div class="form-group">
        <button @click="test">test</button>
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
    },
    async test() {
      //const router = useRouter();
      await axios.post("https://testapi.gusarea.com/v1/private/question/test");
      //console.log(data.token)
      console.log(localStorage.getItem('refreshtoken'))
      //await router.push('/form');
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
}

.form-group {
  margin-bottom: 10px;
}

</style>