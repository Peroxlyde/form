<template>
  <div class="form">
    <h1>แบบสอบถาม</h1>
    <form @submit.prevent="submitForm">
      <div class="type1"></div>
      <div v-for="(selected_question, index) in questions" :key="index">
        <p>{{ selected_question.question_name }}</p>

      </div>
      <div class="type2"></div>
      <div class="type5"></div>
    </form>   
  </div>
</template>

<script>
let json = require('./question.json');
  export default {
    data() {
      return{
      questions: json , // เก็บข้อมูลแบบสอบถามจากไฟล์ question.json
      userAnswersRadio: [],
      userAnswersCheckbox: [],
      userAnswersText: [], 
      userAnswersOtherRadio: [],
      userAnswersOtherCheckbox: [] 
      }
    },
  }
</script>

<style scoped>

</style>