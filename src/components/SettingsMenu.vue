<script>
import {mapActions, mapState} from 'vuex';
import Clock from "@/components/VueAnalogClock.vue";
import ClockIcon from '../assets/Clock.svg';
import ListIcon from '../assets/List.svg';
import SettingsIcon from '../assets/Settings.svg'
import {API_URL} from "@/assets/const.js";

export default {
  name: 'SettingsMenu',
  components: {},

  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['user', 'menu']),
    userLogin() {
      return this.user.login;
    }
  },
  methods: {
    ...mapActions(['clearUser']),
    async exportXlsx() {
      try {
        const response = await fetch(`${API_URL}/workDays/exportXLSX`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          this.errorMessage = data.message || 'There was an error processing.';
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workdays.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

      } catch (error) {
        this.errorMessage = 'There was an error processing.';
      }
    },
    async exportCsv() {
      try {
        const response = await fetch(`${API_URL}/workDays/exportCSV`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          this.errorMessage = data.message || 'There was an error processing.';
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workdays.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

      } catch (error) {
        this.errorMessage = 'There was an error processing.';
      }
    },
    async exportPdf() {
      try {
        const response = await fetch(`${API_URL}/workDays/exportPDF`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          this.errorMessage = data.message || 'There was an error processing.';
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workdays.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

      } catch (error) {
        this.errorMessage = 'There was an error processing.';
      }
    },
    async logout() {
      try {
        const response = await fetch(`${API_URL}/logout`, {
          method: 'POST'
        });
        const data = await response;
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing this image.';
        } else {
          await this.clearUser();
          await this.$router.push('/');
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    }
  }
}

</script>


<template>
  <div class="settings">
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div class="bigText">Export</div>
    <button @click=exportXlsx()>Xlsx</button>
    <button @click=exportPdf()>Pdf</button>
    <button @click=exportCsv()>Csv</button>

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
      <input placeholder="Cost per hour" type="cost" id="cost" v-model="password" required/>
    </div>
    <button @click=loginUser()>Save</button>
    <div v-if="userLogin" class="welcome-message">
      Welcome, {{ userLogin }}!
      <button class="buttonLogOut" @click="logout">Logout</button>

    </div>
  </div>
</template>

<style scoped>
.buttonLogOut {
  position: relative;
  margin-top: 30px;
  color: rgb(0, 0, 0);
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
  width: 100%;
  height: 48px;
  padding: 8px 24px 8px 24px;
  border-radius: 12px;
  background: linear-gradient(45.00deg, rgb(247, 130, 130) 0%, rgb(240, 156, 156) 100%);
}
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
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
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px 8px 24px;
  align-self: stretch;
  border-radius: 12px;
  color: black;
  background: linear-gradient(45.00deg, rgb(187, 229, 243) 0%, rgb(206, 243, 189) 100%);
  border: none;
}

button:active {
  scale: 0.99;
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

.settings {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  font-size: 1.2rem;
  gap: 30px;
  overflow: auto;
}

.bigText {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: 400;
  line-height: 44px;
}
</style>
