import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public name : string="";
  public questionList : any = [];
  public currentQuestion : number = 0;
  public marks: number = 0;
  counter=60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$ : any;
  progress : string ="0"
  isQuizCompleted : boolean = false;
  submit : boolean = false;
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllquestions();
    this.startCounter();
  }

  getAllquestions(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
        })
  }

  nextQuestion(){
    this.currentQuestion++;
    this.counter = 60;
  }
  prevQuestion(){
    this.currentQuestion--;
    this.counter = 60;
  }

  answer(currentQno:number,option:any){

    if(currentQno == this.questionList.length){
      this.submit = true;
      this.stopCounter();
    }
    if(option.correct){
      this.marks+= 10;
      this.correctAnswer++;
      setTimeout(() =>{
        // this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    }
    
    else{
      setTimeout(() =>{
        this.marks-=10;
        // this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    }
    if(this.currentQuestion < this.questionList.length-1){
      this.currentQuestion++;
    }

  }


  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
    
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

  onSubmit(){
    this.isQuizCompleted = true;
  }
}
