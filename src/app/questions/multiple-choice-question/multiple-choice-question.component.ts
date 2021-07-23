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
  answers: string[] = ['']

  constructor() { }

  ngOnInit(): void {
    let answers = this.data.incorrect_answers.concat(this.data.correct_answer)
    let shuffledAnswers = this.shuffleAnswers(answers)
    this.answers = shuffledAnswers
  }

  addNewAnswer(value: string): void {
    let question = this.data.question
    if(value === this.data.correct_answer){
      this.newAnswerEmitter.emit([question, true])
    }else{
      this.newAnswerEmitter.emit([question, false])
    }
  }

  shuffleAnswers(answers: string[]): string[] {
    let currentIndex = answers.length, randomIndex

    while(0 !== currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]] 
    }

    return answers
  }

}
