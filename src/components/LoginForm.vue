<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
      register: true
    };
  },
  computed: {
    ...mapState(['user']),
    userLogin() {
      return this.user.login;
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({login: this.login, password: this.password})
        });
        const data = await response.json();

        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing this image.';
        } else {
          this.setUser(data.user);
          this.errorMessage = '';
          this.login = '';
          this.password = '';
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    }
  }
}
</script>

<template>
  <div v-if="!userLogin" class="login-form">
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="submitForm" class="fields">
      <div class="bigText">Let's record the</div>
      <div class="text-gradient">time!</div>
      <div class="watch-block">
        <AnalogClock
            watchFaceBackground="#673F69"
            watchDigitsColor="#FFFFFF"
            watchDigitsMinuteMarksColor="#FFFFFF"
            watchHoursHand="#FFAF45"
            watchMinutesHand="#FB6D48"
            watchSecondsHand="#E72929"
        />
      </div>
      <div class="switchText" v-if="register">Login</div>
      <div class="switchText" v-if="!register">Registration</div>
      <div class="form-group">
        <div class="iconWrapper">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
          >
            <path id="icon"
                  d="M16.75 0.75C17.8546 0.75 18.75 1.64542 18.75 2.75L18.75 11.75C18.75 12.5784 18.4142 13.3284 17.8713 13.8713C17.3284 14.4142 16.5784 14.75 15.75 14.75L3.75 14.75C2.92157 14.75 2.17157 14.4142 1.62868 13.8713C1.08578 13.3284 0.75 12.5784 0.75 11.75L0.75 2.75C0.75 1.64542 1.64543 0.75 2.75 0.75L16.75 0.75ZM1.75 1.75L7.75 7.75L8.33578 8.33578C9.11684 9.11682 10.3832 9.11682 11.1642 8.33578L11.75 7.75L17.75 1.75M17.8713 13.8713L11.75 7.75M1.62868 13.8713L7.75 7.75"
                  stroke="#686B6E" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linecap="round"/>
          </svg>
        </div>
        <input type="text" id="login" v-model="login" required/>
      </div>
      <div class="form-group">
        <div class="iconWrapper">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
          >
            <path id="icon"
                  d="M12.75 6.75C13.8546 6.75 14.75 7.64542 14.75 8.75L14.75 14.75C14.75 15.8546 13.8546 16.75 12.75 16.75L2.75 16.75C1.64543 16.75 0.75 15.8546 0.75 14.75L0.75 8.75C0.75 7.64542 1.64543 6.75 2.75 6.75L12.75 6.75ZM3.75 6.75L3.75 4.75C3.75 2.54086 5.54086 0.75 7.75 0.75C9.95914 0.75 11.75 2.54086 11.75 4.75L11.75 6.75M7.75 11.75C7.19771 11.75 6.75 11.3023 6.75 10.75C6.75 10.1977 7.19771 9.75 7.75 9.75C8.30229 9.75 8.75 10.1977 8.75 10.75C8.75 11.3023 8.30229 11.75 7.75 11.75ZM7.75 11.75L7.75 13.75"
                  stroke="#686B6E" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linejoin="round"/>
          </svg>
        </div>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <button type="submit">Login</button>
      <div class="switchBlock">
        <div class="switchText" v-if="register" @click="register = !register">Registration?</div>
        <div class="switchText" v-if="!register" @click="register = !register">Login?</div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 9px 15px 0 rgba(0, 0, 0, 0.25);
  background: rgb(21, 37, 82);
}

* {
  box-sizing: border-box;
}

.fields {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.form-group {
  position: relative;
  width: 80vw;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  background: rgb(26, 29, 33);
  color: white;
  transition: border-color 0.3s ease;
  outline: none;
}

.form-group input {
  border-radius: 8px;
  background: rgb(26, 29, 33);
  color: white;
  transition: border-color 0.3s ease;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  padding-left: 40px;
  padding-right: 10px;
  height: 40px;
  border: none;

  &:focus {
    border-color: rgb(130, 219, 247);
    box-shadow: 0 0 0 1px rgb(182, 240, 156), 0 0 5px 4px rgba(132, 220, 245, 0.24);
  }
}

button {
  position: relative;
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px 8px 24px;
  align-self: stretch;
  border-radius: 12px;
  color: black;
  background: linear-gradient(45.00deg, rgb(130, 219, 247) 0%, rgb(182, 240, 156) 100%);
  border: none;
}

button:active {
  scale: 0.99;
}

button:hover {
  //background: linear-gradient(45.00deg, rgb(130, 219, 247) 0%, rgb(182, 240, 156) 100%);
}

.error-message {
  color: red;
  margin-bottom: 15px;
}

.iconWrapper {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.iconWrapper svg {
  margin-top: 5px;
  width: 24px;
  height: 24px;
}

.bigText {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: 400;
  line-height: 44px;
}

.watch-block {
  position: relative;
  width: 156px;
  height: 156px;
  border-radius: 50%;
  border: 2px solid rgb(23, 47, 106);
  box-shadow: -44px -7px 40px 15px rgba(0, 0, 0, 0.25), 36px 14px 30px 9px rgba(23, 47, 106, 0.6);
  background: rgb(21, 38, 79);
}

.text-gradient {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: 400;
  line-height: 44px;
  background: linear-gradient(225.00deg, rgb(68, 206, 202), rgb(37, 128, 128), rgb(70, 81, 145), rgb(135, 221, 238), rgb(182, 240, 156));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
  display: inline;
  margin-top: -30px;
}

.switchBlock {
  display: flex;
  position: relative;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 400;
  line-height: 44px;

}

.switchText {
  width: 100%;
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: 400;
  line-height: 44px;
  background: linear-gradient(225.00deg, rgb(68, 206, 202), rgb(37, 128, 128), rgb(70, 81, 145), rgb(135, 221, 238), rgb(182, 240, 156));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
  display: inline;
}

.switchText::after {
  content: '';
  display: block;
  width: 50%;
  height: 3px;
  background: linear-gradient(45deg, rgb(130, 219, 247) 0%, rgb(182, 240, 156) 100%);
  position: absolute;
  bottom: -10px;
  transform: translateX(-50%);
  left: 50%;
}
</style>