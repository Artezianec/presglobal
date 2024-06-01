<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'UserProfile',
  computed: {
    ...mapState(['user']),
    userLogin() {
      return this.user.login;
    }
  },
  methods: {
    ...mapActions(['clearUser']),

    async logout() {
      try {
        const response = await fetch('http://localhost:3000/logout', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response;
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing this image.';
        } else {
          await this.clearUser();
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    }
  }
}

</script>


<template>
  <div class="user-profile">
    <div v-if="userLogin" class="welcome-message">
      Welcome, {{ userLogin }}!
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  margin-top: 20px;
  font-size: 1.2rem;
}

.welcome-message {
  margin-top: 15px;
  font-size: 1.5rem;
  color: #333;
}
</style>