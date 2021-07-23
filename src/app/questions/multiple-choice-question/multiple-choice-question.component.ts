import { QuestionBody } from './../../interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.sass']
})
export class MultipleChoiceQuestionComponent implements OnInit {

  @Input() data: QuestionBody = 
  {
    category: '',
    type: '',
    question: '',
    correct_answer: '',
    incorrect_answers: ['']
  }
  @Output() newAnswerEmitter = new EventEmitter<[string, boolean]>()

  constructor() { }

  ngOnInit(): void {
  }

  addNewAnswer(value: string) {
    let question = this.data.question
    if(value === this.data.correct_answer){
      this.newAnswerEmitter.emit([question, true])
    }else{
      this.newAnswerEmitter.emit([question, false])
    }
  }

}
