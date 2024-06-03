<script>
import {mapActions, mapState} from 'vuex';
import {API_URL} from "@/assets/const.js";

export default {
  name: 'ListMenu',
  components: {},

  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
      selectedMonth: '',
      selectedYear: '',
      comment: '',
      okMessage: '',
      months: [
        {value: '', text: 'All'},
        {value: 0, text: 'January'},
        {value: 1, text: 'February'},
        {value: 2, text: 'March'},
        {value: 3, text: 'April'},
        {value: 4, text: 'May'},
        {value: 5, text: 'June'},
        {value: 6, text: 'July'},
        {value: 7, text: 'August'},
        {value: 8, text: 'September'},
        {value: 9, text: 'October'},
        {value: 10, text: 'November'},
        {value: 11, text: 'December'}
      ],
      showDialog: false,
      selectedWorkday: null,
      years: this.generateYears()
    };
  },
  computed: {
    ...mapState(['user', 'menu']),
    filteredWorkdays() {
      return this.user.workdays.filter(workday => {
        const entryDate = new Date(workday.datetime_entry);
        const monthMatches = this.selectedMonth === '' || entryDate.getMonth() === this.selectedMonth;
        const yearMatches = this.selectedYear === '' || entryDate.getFullYear() === this.selectedYear;
        return monthMatches && yearMatches;
      });
    },
  },
  methods: {
    ...mapActions(['clearUser']),
    formatTime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString();
    },
    calculateHours(entry, exit) {
      if (!exit) return 'No exit';
      const entryDate = new Date(entry);
      const exitDate = new Date(exit);
      const diff = Math.abs(exitDate - entryDate);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear - 10; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    },
    showDialogFunc(workdayId) {
      this.showDialog = true;
      this.selectedWorkday = this.filteredWorkdays.find(workday => workday.id === workdayId);
    },
    closeDialog() {
      this.showDialog = false;
      this.selectedWorkday = null;
    },
    calculatePrice(workday) {
      const hours = this.calculateHours(workday.datetime_entry, workday.datetime_exit);
      return (this.user.price * hours).toFixed(2);
    },
    async addComment() {
      try {
        const response = await fetch(`${API_URL}/workDays/addCommentToWorkDay`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({workdayId: this.selectedWorkday.id, comment: this.comment})
        });
        const data = await response.json();
        if (!response.ok) {
          this.errorMessage = data.message || 'There was an error processing.';
        } else {
          this.okMessage = data.message || 'Comment added successfully.';
          this.closeDialog();
          this.comment = '';
        }
      } catch (error) {
        this.errorMessage = 'There was an error processing this image.';
      }
    },
  },
};
</script>


<template>
  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>
  <div class="listDays">
    <div class="filters">
      <label for="month">Month:</label>
      <select id="month" v-model="selectedMonth">
        <option v-for="month in months" :key="month.value" :value="month.value">{{ month.text }}</option>
      </select>

      <label for="year">Year:</label>
      <select id="year" v-model="selectedYear">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div @click="showDialogFunc(workday.id)" v-for="workday in filteredWorkdays" :key="workday.id" class="group">
      <div class="column">
        <div class="time">
          Entry {{ formatTime(workday.datetime_entry) }}
          <span v-if="workday.datetime_exit"> - Exit {{ formatTime(workday.datetime_exit) }}</span>
        </div>
        <div class="price">{{calculatePrice(workday)}}</div>
      </div>
      <div class="column">
        <div class="date">{{ formatDate(workday.datetime_entry) }}</div>
        <div class="hours">{{ calculateHours(workday.datetime_entry, workday.datetime_exit) }}</div>
      </div>
    </div>
    <div class="line"/>
  </div>
  <div v-if="showDialog" class="overlay">
    <div class="dialog">
      <div class="exitIconWrapper">
        <svg @click="closeDialog()" cursor="pointer"
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
        >
          <path id="icon"
                d="M8.25 15.75C4.10791 15.75 0.75 12.3921 0.75 8.25C0.75 4.10791 4.10791 0.75 8.25 0.75C12.3921 0.75 15.75 4.10791 15.75 8.25C15.75 12.3921 12.3921 15.75 8.25 15.75ZM5.75 5.75L8.25 8.25L10.75 10.75M10.75 5.75L8.25 8.25M8.25 8.25L5.75 10.75"
                stroke="#363A3D" stroke-opacity="1.000000" stroke-width="1.500000"/>
        </svg>
      </div>
      <div>Breaks:</div>
      <div>Edit Entry Time</div>
      <div>Edit exit time</div>
      <div v-if="selectedWorkday">Comment: {{ selectedWorkday.comment }}</div>
      <input placeholder="Add comment" type="text" v-model="comment" required/>
      <button @click="addComment()">Send</button>
    </div>
  </div>
</template>

<style scoped>
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
  background: linear-gradient(45.00deg, rgb(187, 229, 243) 0%, rgb(206, 243, 189) 100%);
  border: none;
}

button:active {
  scale: 0.99;
}

input {
  border-radius: 8px;
  background: rgb(26, 29, 33);
  color: white;
  transition: border-color 0.3s ease;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  padding-right: 10px;
  height: 40px;
  border: none;
  padding-left: 10px;

  &:focus {
    border-color: rgb(130, 219, 247);
    box-shadow: 0 0 0 1px rgb(182, 240, 156), 0 0 5px 4px rgba(132, 220, 245, 0.24);
  }
}

.group {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: rgba(238, 238, 238, 0.93);
  font-size: 24px;
  font-weight: 400;
  line-height: 33px;
  z-index: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

}

.time,
.date,
.price,
.hours {
  height: auto;
}

.date {
  background: linear-gradient(45.00deg, rgb(130, 219, 247), rgb(182, 240, 156));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
}

.time {
  color: rgba(238, 238, 238, 0.93);
  font-size: 20px;
  font-weight: 400;
  line-height: 33px;
}

.price {
  color: rgba(238, 238, 238, 0.93);
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
}

.hours {
  color: rgb(204, 204, 204);
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
}

.line {
  content: '';
  display: block;
  width: 90%;
  border: 1px solid rgb(204, 204, 204);
  position: relative;
}

.listDays {
  margin-top: 30px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  color: white;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
  color: white;
}

.dialog {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 430px;
  width: 50%;
  gap: 20px;

  border-radius: 16px;
  background: rgb(37, 90, 143);
  padding: 30px;
  z-index: 12;
}

.exitIconWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
