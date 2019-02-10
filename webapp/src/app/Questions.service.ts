import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private API_URL = "http://localhost:3000/api/Answers"

  constructor(private _http: HttpClient) { }

  getQuestions(q: number = 10) {
    return this._http.get(`${this.API_URL}/randomQuestions?quantity=${q}`)
  }

}
