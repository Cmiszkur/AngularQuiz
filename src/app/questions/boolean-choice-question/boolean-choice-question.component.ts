import { QuestionBody } from './../../interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boolean-choice-question',
  templateUrl: './boolean-choice-question.component.html',
  styleUrls: ['./boolean-choice-question.component.sass']
})
export class BooleanChoiceQuestionComponent implements OnInit {

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

}
