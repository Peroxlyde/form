<template>
  <div class="form">
    <header>
      <h1>แบบสอบถาม</h1>
    </header>
    <!--<div class="alert"><div class ='alertSuccess' v-if="isSuccess" >Your form has been submitted.</div></div>-->
    <form @submit.prevent="submitForm">
      <div v-for="selected_question in questions.question" :key="selected_question.question_no">
        <!--<p>{{ selected_question.question_name}}</p>-->

        <div v-if="selected_question.question_type == 1 " class="cards">
          <span class="quest">{{ selected_question.question_no }}. {{ selected_question.question_name }}</span>
          <span v-if="selected_question.is_require==1" class="required">
            <span>*</span>
          </span>
          <div class="choicepanel">
          <div v-for="choice in selected_question.question_choice" :key="choice.question_choice_no" class="choice">
            <input type="radio" v-model="selected_question.user_ans" :value="Number(choice.question_choice_no)" />
            <label>{{ choice.question_choice_text }}</label>
            <div v-if="choice.is_other==1">
              <input type="text" v-model="selected_question.user_ans__text" placeholder="กรุณาระบุรายละเอียดเพิ่มเติม" class="textbox" />
            </div>
          </div>
        </div>
        </div>

        <div v-if="selected_question.question_type === 2" class="cards">
          <span class="quest">{{ selected_question.question_no }}. {{ selected_question.question_name }}</span>
          <span v-if="selected_question.is_require== 1" class="required">
            <span>*</span>
          </span>
          <div class="choicepanel">
          <div v-for="choice in selected_question.question_choice" :key="choice.question_choice_no" class="choice">
            <input type="checkbox" v-model="selected_question.user_ans" :value="Number(choice.question_choice_no)" />
            <label>{{ choice.question_choice_text }}</label>
            <div v-if="choice.is_other==1">
              <input type="text" v-model="selected_question.user_ans_text" placeholder="กรุณาระบุรายละเอียดเพิ่มเติม" class="textbox" />
            </div>
          </div>
          </div>
        </div>

        <div v-if="selected_question.question_type === 5" class="textcard">
          <span class="quest">{{ selected_question.question_no }}. {{ selected_question.question_name }}</span>
          <span v-if="selected_question.is_require==1" class="required">
            <span>*</span>
          </span>
          <div class="textans">
            <textarea v-model="selected_question.user_ans" placeholder="กรุณาตอบคำถามนี้" class="textbox"></textarea>
          </div>
        </div>

      </div>
      <div class="cenbutton">
        <button type="submit">ส่งแบบสอบถาม</button>
        <button @click="clear">รีเซทแบบฟอร์ม</button>
      </div>
    </form>   
  </div>
</template>

<script>
//let download =require("downloadjs")
//let fs = require('node:fs');
//import {writeJsonFileSync} from 'write-json-file';
//let json = require('./question.json');
import axios from "axios";
  export default {
    mounted(){
      axios.get("https://testapi.gusarea.com/v1/public/question/getData")
        .then(response=>this.questions = response.data.result)
    },
    data() {
      return{
      questions:[] , // เก็บข้อมูลแบบสอบถามจากไฟล์ question.json
      isSuccess:false
      }
    },
    methods: {
      submitForm() {
          if(this.valid()){
          //console.log('ส่งข้อมูลแบบสอบถาม', this.questions);
          //download(JSON.stringify(this.questions), 'question.json', "text/plain");
          axios.post("https://testapi.gusarea.com/v1/private/question/setData",{json:this.questions})
          .then(response=>console.log(response))
          .catch(error=>console.log(error))
          //this.clear()
          alert("Thank you!\nYour form has been submitted.");
          this.isSuccess=true;
          //localStorage.clear();
          }
        },
        clear(){
          for(let i =0; i<this.questions.question.length;i++){
            if(this.questions.question[i].question_type==1||this.questions.question[i].question_type==5){
              this.questions.question[i].user_ans= null
              this.questions.question[i].user_ans_text=''}
            else if(this.questions.question[i].question_type==2){
              this.questions.question[i].user_ans=[]
              this.questions.question[i].user_ans_text=''}
            //console.log('ส่งข้อมูลแบบสอบถาม', this.questions);
          }
        },
        valid(){
          for(let i =0; i<this.questions.question.length;i++){
            if(this.questions.question[i].is_require==1){
              if(this.questions.question[i].user_ans == null){
                break;
              }
            }
            return true;
          }
          //writeJsonFileSync(this.json,this.questions)
          //try{await fs.writeFile('./question.json',this.questions)}
          //catch(err){console.log('error')}
          //download(JSON.stringify(this.questions), 'question.json', "text/plain");
        }

  
      }


  }
</script>

<style scoped>
header{
  margin: 2rem;
  border-radius: 10px;
  text-align: center;
  background-color: lightgoldenrodyellow;
  padding: 0.5rem;
  box-shadow: 0 1px 5px rgba(48, 48, 48, 0.459);
}
.cards{
  margin: 2rem 1rem;
  padding: 1rem 1.5rem;
  background-color: rgba(250, 232, 198, 0.591);
  box-shadow: 0 1px 5px rgba(48, 48, 48, 0.459);
  padding-bottom: 0 2rem;
  border-radius: 15px;
}
.textcard{
  margin: 2rem 1rem;
  padding: 1rem 1.5rem;
  background-color: white;
  box-shadow: 0 1px 5px rgba(48, 48, 48, 0.459);
  padding-bottom: 0 2rem;
  border-radius: 15px;
}
.textbox {
  width: 95%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
}
.texans{
  margin-top:10px;
}
.quest{
  font-size: x-large;
  font-weight: bold;
}
.choice{
  margin:10px;
}
.choicepanel{
  margin-top:10px;
  background-color: rgb(255, 250, 244);
  padding: 0.6rem;
}
button{
  margin: 0 1rem ;
  margin-bottom: 1rem;
  font-size: medium;
}
.cenbutton{
  text-align: center;
}
.required{
  color: red;
  font-weight: bold;
  font-size: larger;
  margin-left: 0.5rem;
}
.alertSuccess{
  margin: 2rem;
  width: 80%;
  text-align: center;
  background-color: rgb(205, 240, 212);
  padding: 2rem;
  box-shadow: 0 1px 5px rgba(48, 48, 48, 0.459);
  font-size: larger;
  font-weight: bold;
  color: rgb(38, 35, 35);
}
.alert{
  display: flex;
  justify-content: center;
}

</style>