import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "./Questions.service"
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public anwersData: any = {};
  public questionsForm: any = {};
  public completed = 0;
  public calification = "0";
  public maxCalification = 100;
  public name ="";

  constructor(private _questionsService: QuestionsService) {
  }

  public setName() {
    sessionStorage.setItem('name', this.name);
  }

  private getQuestions() {
    this._questionsService.getQuestions(10).subscribe((questions:any)=>{
      this.questionsForm = questions.data;
    });
  }

  ngOnInit(): void {

    this.name = sessionStorage.getItem('name') || '';
    this.completed = parseInt(sessionStorage.getItem('completed'));

    if (!this.completed) {
     this.getQuestions();
    } else {
      this.calification = sessionStorage.getItem('calification');
    }
  }

  onSubmit(event) {
    console.log(event);
    this.completed = 1;

    let valAnswer = this.maxCalification / _.size(this.questionsForm.answers);
    let calificacion = 0;
    console.log( this.maxCalification, valAnswer);

    _.each(event, (val, key)=>{
      if (_.isEqual(this.questionsForm.answers[key], val)) {
        calificacion+=valAnswer;
      }
    });


    this.calification = calificacion.toFixed(2);
    sessionStorage.setItem('completed', "1");
    sessionStorage.setItem('calification', calificacion.toFixed(2));
  }

  newTest() {
    this.completed = 0;
    this.calification = "0";
    sessionStorage.removeItem("completed");
    sessionStorage.removeItem("calification");
    sessionStorage.removeItem("name");
    this.name="";
    this.anwersData = {};
    this.getQuestions();
  }
}
