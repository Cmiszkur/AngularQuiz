import { QuestionItem } from './../Question-Item';
import { QuestionDirective } from './../directives/question.directive';
import { Question, QuestionComponent } from './../interfaces';
import { DialogService } from './../services/dialog.service';
import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {

  currentQuestionIndex = -1
  questions: QuestionItem[] = []
  dotsArray =  new BehaviorSubject([''])
  dotsArray$: Observable<any[]> = this.dotsArray.asObservable()
  @ViewChild(QuestionDirective, {static: true}) appQuestion!: QuestionDirective

  constructor( 
    private route: ActivatedRoute, 
    private dialogService: DialogService,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {   
    this.prefetchQuestions()
    this.document.documentElement.style.setProperty('--number-of-questions', `${this.questions.length}`)
    this.loadComponent()
    this.setDotsArray(this.currentQuestionIndex, this.questions.length)
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.dialogService.confirm('Czy chcesz porzucić obecny quiz?');
  }

  private prefetchQuestions() {
    this.route.data.subscribe(data => {
      const questions: QuestionItem | QuestionItem[] = data.questions
      this.questions = this.questions.concat(questions)
    })
  }

  loadComponent(): void {
    this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length
    const questionItem = this.questions[this.currentQuestionIndex]

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(questionItem.component)

    const viewContainerRef = this.appQuestion.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent<QuestionComponent>(componentFactory)
    componentRef.instance.data = questionItem.data
    componentRef.instance.newAnswerEmitter.subscribe(val => this.captureAnswer(val))
  }

  captureAnswer(answer: [string, boolean]): void {
    this.loadComponent()
    this.setDotsArray(this.currentQuestionIndex, this.questions.length)
  }

  setDotsArray(currentQuestion: number, numberOfQuestions: number) {
    // if(curre)
    let dotsArray = new Array(numberOfQuestions)
    dotsArray = dotsArray.fill("inactive")
    dotsArray[currentQuestion] = 'active'
    console.log(dotsArray)
    this.dotsArray.next(dotsArray)
  }

}
