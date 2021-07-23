import { BooleanChoiceQuestionComponent } from './../questions/boolean-choice-question/boolean-choice-question.component';
import { MultipleChoiceQuestionComponent } from './../questions/multiple-choice-question/multiple-choice-question.component';
import { QuestionItem } from './../Question-Item';
import { Question } from './../interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://opentdb.com/api.php?'

  empty_response = {
    response_code: 5,
    results: [
      {
        category: '',
        type: '',
        question: '',
        correct_answer: '',
        incorrect_answers: ['']
      }
    ]
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getQuestions(
    numberOfQuestions: string | null, 
    category: string | null, 
    difficulty: string | null): Observable<QuestionItem | QuestionItem[]> {

    let fetchURL = this.baseURL
    fetchURL = fetchURL.concat(`amount=${numberOfQuestions}`)
    if(!!category){
      fetchURL = fetchURL.concat(`&category=${category}`)
    }
    if(!!difficulty){
      fetchURL = fetchURL.concat(`&difficulty=${difficulty}`)
    }
    fetchURL = fetchURL.concat(`&encode=url3986`)
    console.log(fetchURL)
    return this.http.get<Question>(fetchURL)
      .pipe(
        map(response => {
          if(response.response_code === 0){

            let questions = response.results

            return questions.map(question =>{

              question.category = decodeURIComponent(question.category)
              question.question = decodeURIComponent(question.question)
              question.correct_answer = decodeURIComponent(question.correct_answer)
              question.incorrect_answers = question.incorrect_answers.map(incorrectAnswer => decodeURIComponent(incorrectAnswer))

              if(question.type === 'multiple'){
                return new QuestionItem(MultipleChoiceQuestionComponent, question)
              }else{
                return new QuestionItem(BooleanChoiceQuestionComponent, question)
              }
            })
            
          }else{
            return new QuestionItem(MultipleChoiceQuestionComponent)
          }
        }),
        catchError(this.handleError<QuestionItem>('getQuestions', new QuestionItem(MultipleChoiceQuestionComponent)))
      )

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
