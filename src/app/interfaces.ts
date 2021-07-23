import { EventEmitter } from "@angular/core";

export interface Category {
    id: number,
    category: string
}
  
export interface Question {
    response_code: number,
    results:{
        category: string,
        type: string,
        question: string,
        correct_answer: string,
        incorrect_answers: string[]
    }[]
}

export interface QuestionBody {
    category: string,
    type: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export interface CategoryGroup {
    name: string,
    categories: Category[]
}

export interface Difficulty {
    value: string,
    viewValue: string
} 

export interface QuestionComponent {
    data: any;
    newAnswerEmitter: EventEmitter<[string, boolean]>
}