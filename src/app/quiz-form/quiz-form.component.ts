import { QuestionsService } from './../services/questions.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

interface Difficulty {
  value: string,
  viewValue: string
} 

interface Category {
  id: number,
  category: string
}

interface CategoryGroup {
  name: string,
  categories: Category[]
}

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.sass']
})
export class QuizFormComponent implements OnInit {

  categoryControl = new FormControl()
  selectedDif?: string
  numberOfQuestions = 3

  difficulties: Difficulty[] = [
    {value: 'easy', viewValue: "Easy"},
    {value: 'medium', viewValue: "Medium"},
    {value: 'hard', viewValue: "Hard"}
  ]

  categories: CategoryGroup[] = [
    {
      name: 'Entertainment',
      categories: [
        {
          id: 10,
          category: 'Books'
        },
        {
          id: 11,
          category: 'Film'
        },
        {
          id: 12,
          category: 'Music'
        },
        {
          id: 14,
          category: 'Television'
        }
      ]
    },
    {
      name: 'Science',
      categories: [
        {
          id: 17,
          category: 'Science & Nature'
        },
        {
          id: 18,
          category: 'Computers'
        },
        {
          id: 19,
          category: 'Mathematics'
        }
      ]
    },
    {
      name: 'Other',
      categories: [
        {
          id: 9,
          category: 'General Knowledge'
        },
        {
          id: 22,
          category: "Geography"
        },
        {
          id: 23,
          category: "History"
        },
        {
          id: 24,
          category: "Politics"
        },
      ]
    }
  ]

  constructor(private questionsService: QuestionsService, private router: Router) { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 2) {
      this.numberOfQuestions = value
      return value
    }
    this.numberOfQuestions = value
    return value
  }

  goToQuiz(e: MouseEvent){

    e.preventDefault()

    let optionalParameters = {}

    if(this.categoryControl.value || this.selectedDif){

      if(this.categoryControl.value && this.selectedDif){
        optionalParameters =  { category: this.categoryControl.value, difficulty: this.selectedDif }
      }else{

        if(this.categoryControl.value){
          optionalParameters = { category: this.categoryControl.value }
        }
  
        if(this.selectedDif){
          optionalParameters = { difficulty: this.selectedDif }
        }

      }
    }

    this.router.navigate(['/quiz', this.numberOfQuestions, optionalParameters])
  }

}
