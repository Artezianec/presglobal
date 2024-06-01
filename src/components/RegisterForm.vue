<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'RegisterForm',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState(['userName'])
  },
  methods: {
    ...mapActions(['setUserName']),
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({login: this.login, password: this.password})
        });
        const data = await response.json();

        if (!response.ok) {
          this.errorMessage = data.error || 'There was an error processing.';
        } else {
          await this.setUserName(data.name);
          this.errorMessage = '';
          this.login = '';
          this.password = '';
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing.';
      }
    }
  }
}
</script>

<template>
  <div class="login-form">
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="login">login:</label>
        <input type="text" id="login" v-model="login" required/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="userName" class="welcome-message">
      Welcome, {{ userName }}!
    </div>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}

.welcome-message {
  margin-top: 15px;
  font-size: 1.5rem;
  color: #333;
}
</style>