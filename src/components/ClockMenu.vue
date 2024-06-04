<script>
import {mapActions, mapState} from 'vuex';
import Clock from "@/components/VueAnalogClock.vue";
import {useCurrentTime} from "../components/useCurrentTime";
import {API_URL} from "@/assets/const.js";

export default {
  name: 'ClockMenu',
  components: {
    Clock,
  },
  setup() {
    const {currentTime} = useCurrentTime();
    return {currentTime};
  },

  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
      register: true,
      size: 320,
      animate: true,
      actualDate: new Date(),
      myDate: new Date(),
      enableTimeFlow: true,
      setDateInput: "",
    };
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      menu: state => state.menu
    }),
  },
  methods: {
    ...mapActions(['clearUser', 'setWorkDay', 'setUserWorkdays', 'setUser', 'setUserOnBreak']),
    async enterFunc() {
      try {
        const formattedTime = new Date(this.currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/addWorkDay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({datetime_entry: formattedTime, datetime_exit: null})
        });
        const data = await response.json();
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing.';
        } else {
          await this.setWorkDay(data);
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    },
    async exitFunc() {
      try {
        const formattedTime = new Date(this.currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/updateDateTimeExit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({workdayId: this.user.onworkday, datetime_exit: formattedTime})
        });
        const data = await response.json();
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing.';
        } else {
          this.setUserOnBreak(data.onbreak);
          this.setWorkDay(data.onworkday);
          this.setUserWorkdays(data.workdays);
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    },
    async startBreak() {
      try {
        const formattedTime = new Date(this.currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/addBreak`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({workdayId: this.user.onworkday, datetime_entry: formattedTime, datetime_exit: null})
        });
        const data = await response.json();
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing.';
        } else {
          this.setUserOnBreak(data.onbreak);
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    },
    async endBreak() {
      try {
        const formattedTime = new Date(this.currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/updateBreakTimeExit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({breakId: this.user.onbreak, datetime_exit: formattedTime})
        });
        const data = await response.json();
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing.';
        } else {
          this.setUserOnBreak(0);
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    },
  }
}

</script>


<template>
  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>
  <div class="topButtons">
    <div class="circle">
      +
    </div>
  </div>
  <div class="watch-block">
    <clock :size="size"
           :auto-size="true"
           v-model="myDate"
           :enable-time-flow="enableTimeFlow"
           :transition-speed="80"
    />
  </div>
  <div class="bigText">
    <p>{{ currentTime.toLocaleTimeString() }}</p>
    <p>{{ currentTime.toLocaleDateString() }}</p>
  </div>
  <div v-if="user.onworkday > 0 && user.onbreak === 0" class="bigText onWork">OnWork</div>
  <div v-if="user.onworkday > 0 && user.onbreak > 0" class="bigText onBreak">On Break</div>
  <button v-if="user.onworkday === 0" @click="enterFunc()" class="buttonEnter">Enter</button>
  <button v-if="user.onbreak === 0 && user.onworkday > 0" @click="startBreak()" class="buttonBreak">Break</button>
  <button v-if="user.onbreak > 0" @click="endBreak()" class="buttonEndBreak">End Break</button>
  <button v-if="user.onworkday > 0" @click="exitFunc()" class="buttonExit">Exit</button>

</template>

<style scoped>

.buttonEnter {
  color: rgb(0, 0, 0);
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
  width: 315px;
  height: 48px;
  padding: 8px 24px 8px 24px;
  border-radius: 12px;
  background: linear-gradient(45.00deg, rgb(130, 219, 247) 0%, rgb(182, 240, 156) 100%);
}

.buttonBreak {
  color: rgb(0, 0, 0);
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
  width: 315px;
  height: 48px;
  padding: 8px 24px 8px 24px;
  border-radius: 12px;
  background: linear-gradient(45.00deg, rgb(130, 247, 132) 0%, rgb(162, 240, 156) 100%);
}
.buttonEndBreak {
  color: rgb(0, 0, 0);
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
  width: 315px;
  height: 48px;
  padding: 8px 24px 8px 24px;
  border-radius: 12px;
  background: linear-gradient(45.00deg, rgb(247, 224, 130) 0%, rgb(222, 240, 156) 100%);
}

.buttonExit {
  color: rgb(0, 0, 0);
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
  width: 315px;
  height: 48px;
  padding: 8px 24px 8px 24px;
  border-radius: 12px;
  background: linear-gradient(45.00deg, rgb(247, 130, 130) 0%, rgb(240, 156, 156) 100%);
}

.onWork {
  color: green !important;
}
.onBreak {
 color: chocolate !important;
}
.watch-block {
  position: relative;
  max-width: 170px;
  max-height: 170px;
  border-radius: 50%;
  border: 2px solid rgb(23, 47, 106);
  box-shadow: -44px -7px 40px 15px rgba(0, 0, 0, 0.25), 36px 14px 30px 9px rgba(23, 47, 106, 0.6);
  background: rgb(21, 38, 79);
  z-index: 1;
}

.bigText {
  margin-top: -40px;
  color: rgb(255, 255, 255);
  font-size: 26px;
  font-weight: 400;
  line-height: 44px;
}

.circle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 40px;
  background: linear-gradient(45.00deg, rgb(130, 219, 247) 0%, rgb(182, 240, 156) 100%);
}

.topButtons {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
