<template>
  <div class="form">
    <h1>แบบสอบถาม</h1>
    <form @submit.prevent="submitForm">
      <div v-for="selected_question in questions" :key="selected_question.question_no">
        <!--<p>{{ selected_question.question_name}}</p>-->

        <div v-if="selected_question.question_type == '1'">
          <h2>{{ selected_question.question_no }}. {{ selected_question.question_name }}</h2>
          <div v-if="selected_question.is_require=='1'">
            <span class="required">*</span>
          </div>
          <div v-for="choice in selected_question.question_choice" :key="choice.question_choice_no">
            <input type="radio" v-model="userAnswersRadio[selected_question.question_no]" :value="choice.question_choice_no" />
            <label>{{ choice.question_choice_text }}</label>
          </div>
        </div>

        <div v-if="selected_question.question_type === '2'">
          <h2>{{ selected_question.question_no }}. {{ selected_question.question_name }}</h2>
          <div v-if="selected_question.is_require=='1'">
            <span class="required">*</span>
          </div>
          <div v-for="choice in selected_question.question_choice" :key="choice.question_choice_no">
            <input type="checkbox" v-model="userAnswersCheckbox" :value="choice.question_choice_no" />
            <label>{{ choice.question_choice_text }}</label>
            <div v-if="choice.is_other=='1'">
              <input type="text" v-model="userAnswersOtherCheckbox" placeholder="กรุณาระบุรายละเอียดเพิ่มเติม" />
            </div>
          </div>
        </div>

        <div v-if="selected_question.question_type === '5'">
          <h2>{{ selected_question.question_no }}. {{ selected_question.question_name }}</h2>
          <div v-if="selected_question.is_require=='1'">
            <span class="required">*</span>
          </div>
          <textarea v-model="userAnswersText[selected_question.question_no]" placeholder="กรุณาตอบคำถามนี้"></textarea>
        </div>

      </div>
      <button type="submit">ส่งแบบสอบถาม</button>
    </form>   
  </div>
</template>

<script>
let json = require('./question.json');
  export default {
    data() {
      return{
      questions: json.question , // เก็บข้อมูลแบบสอบถามจากไฟล์ question.json
      userAnswersRadio: [],
      userAnswersCheckbox: [],
      userAnswersText: [], 
      userAnswersOtherRadio: [],
      userAnswersOtherCheckbox: [] 
      }
    },
    methods: {
      submitForm() {
       
          console.log('ส่งข้อมูลแบบสอบถาม Radio Box:', this.userAnswersRadio);
          console.log('text:', this.userAnswersText);
          console.log('ส่งข้อมูลแบบสอบถาม Checkbox:', this.userAnswersCheckbox);
          console.log('ส่งข้อมูลแบบสอบถาม Checkboxtext:', this.userAnswersOtherCheckbox);
        }

  
      }


  }
</script>

<style scoped>

</style>