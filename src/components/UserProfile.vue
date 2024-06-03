<script>
import {mapActions, mapState} from 'vuex';
import Clock from "@/components/VueAnalogClock.vue";
import ClockIcon from '../assets/Clock.svg';
import ListIcon from '../assets/List.svg';
import SettingsIcon from '../assets/Settings.svg'
import ClockMenu from "@/components/ClockMenu.vue";
import ListMenu from "@/components/ListMenu.vue";
import SettingsMenu from "@/components/SettingsMenu.vue";
import {API_URL} from "@/assets/const.js";

export default {
  name: 'UserProfile',
  components: {
    SettingsMenu,
    ListMenu,
    ClockMenu,
    Clock,
    ClockIcon,
    ListIcon,
    SettingsIcon
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
      menu: 0
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
  }
}

</script>


<template>
  <div class="user-profile">
    <ClockMenu v-if="menu === 0"/>
    <ListMenu v-if="menu === 1"/>
    <SettingsMenu v-if="menu === 2"/>
    <div class="menu">
      <div class="menuText"
           :class="{ switchTextWhite: menu === 0, switchTextTransparent: menu === 0 }"
           @click="menu = 0"
      >
        <div class="iconWrapper">
          <svg width="20.000000" height="20.000000" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs/>
            <path id="Vector"
                  d="M20 3.86L15.4 0L14.1 1.48L18.7 5.34L20 3.86ZM5.89 1.58L4.6 0.09L0 3.86L1.29 5.34L5.89 1.58ZM10.5 6.13L9 6.13L9 12.07L13.7 14.95L14.5 13.76L10.5 11.38L10.5 6.13ZM10 2.17C5 2.17 1 6.13 1 11.08C1 16.03 5 20 10 20C15 20 19 16.03 19 11.08C19 6.13 15 2.17 10 2.17ZM10 18.01C6.1 18.01 3 14.95 3 11.08C3 7.22 6.1 4.15 10 4.15C13.9 4.15 17 7.22 17 11.08C17 14.95 13.9 18.01 10 18.01Z"
                  fill="#EEEEEE" fill-opacity="0.300000" fill-rule="nonzero"/>
          </svg>
        </div>
        CLOCK
      </div>
      <div class="menuText"
           :class="{ switchTextWhite: menu === 1, switchTextTransparent: menu === 1 }"
           @click="menu = 1">
        <div class="iconWrapper">
          <svg width="22.500000" height="12.500000" viewBox="0 0 22.5 12.5" fill="none"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <desc>
              Created with Pixso.
            </desc>
            <defs/>
            <path id="Vector"
                  d="M0 7.5L2.5 7.5L2.5 5L0 5L0 7.5ZM0 12.5L2.5 12.5L2.5 10L0 10L0 12.5ZM0 2.5L2.5 2.5L2.5 0L0 0L0 2.5ZM5 7.5L22.5 7.5L22.5 5L5 5L5 7.5ZM5 12.5L22.5 12.5L22.5 10L5 10L5 12.5ZM5 0L5 2.5L22.5 2.5L22.5 0L5 0Z"
                  fill="#4D5B7B" fill-opacity="1.000000" fill-rule="nonzero"/>
          </svg>
        </div>
        LIST
      </div>
      <div class="menuText"
           :class="{ switchTextWhite: menu === 2, switchTextTransparent: menu === 2 }"
           @click="menu = 2">
        <div class="iconWrapper">
          <svg width="24.000000" height="24.000000" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs/>
            <path id="Vector"
                  d="M17.65 10.97C17.68 10.66 17.71 10.33 17.71 10C17.71 9.66 17.68 9.33 17.63 9.02L19.81 7.37C20 7.22 20.05 6.95 19.93 6.73L17.88 3.27C17.75 3.04 17.48 2.97 17.25 3.04L14.69 4.04C14.15 3.64 13.58 3.32 12.95 3.07L12.57 0.42C12.53 0.17 12.31 0 12.05 0L7.94 0C7.68 0 7.47 0.17 7.44 0.42L7.05 3.07C6.42 3.32 5.84 3.66 5.31 4.04L2.76 3.04C2.52 2.96 2.25 3.04 2.13 3.27L0.07 6.73C-0.06 6.96 -0.01 7.22 0.2 7.37L2.37 9.02C2.32 9.33 2.28 9.67 2.28 10C2.28 10.32 2.31 10.66 2.36 10.97L0.18 12.62C-0.01 12.77 -0.06 13.05 0.06 13.26L2.11 16.72C2.24 16.95 2.51 17.02 2.74 16.95L5.3 15.95C5.84 16.35 6.41 16.67 7.04 16.92L7.42 19.57C7.47 19.82 7.68 20 7.94 20L12.05 20C12.31 20 12.53 19.82 12.55 19.57L12.94 16.92C13.57 16.67 14.15 16.33 14.68 15.95L17.23 16.95C17.47 17.03 17.74 16.95 17.86 16.72L19.92 13.26C20.05 13.03 20 12.77 19.79 12.62L17.65 10.97ZM10 13.75C7.87 13.75 6.14 12.06 6.14 10C6.14 7.93 7.87 6.25 10 6.25C12.12 6.25 13.85 7.93 13.85 10C13.85 12.06 12.12 13.75 10 13.75Z"
                  fill="#4D5B7B" fill-opacity="1.000000" fill-rule="nonzero"/>
          </svg>

        </div>
        SETTINGS
      </div>
    </div>
  </div>
</template>

<style scoped>

.user-profile {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  font-size: 1.2rem;
  gap: 30px;
  overflow: auto;
}

.welcome-message {
  margin-top: 15px;
  font-size: 1.5rem;
  color: #ffffff;
}

.menu {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 400;
  line-height: 44px;
  z-index: 0;
  background: rgb(21, 37, 82);
}

.menuText {
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  line-height: 44px;
  color: rgb(133, 133, 133);
  background: white;
  -webkit-background-clip: text;
}

.switchTextTransparent {

  -webkit-text-fill-color: transparent;
}

.switchTextWhite {
  color: rgba(238, 238, 238, 0.67);
}

.switchTextTransparent::after {
  content: '';
  display: block;
  width: 60%;
  height: 3px;
  background: linear-gradient(45deg, rgb(130, 219, 247) 0%, rgb(182, 240, 156) 100%);
  position: relative;
  transform: translateX(-50%);
  left: 50%;
}
</style>
