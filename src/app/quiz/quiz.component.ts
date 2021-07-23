import { QuestionItem } from './../Question-Item';
import { QuestionDirective } from './../directives/question.directive';
import { Question, QuestionComponent } from './../interfaces';
import { DialogService } from './../services/dialog.service';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {

  currentQuestionIndex = -1
  questions: QuestionItem[] = []
  @ViewChild(QuestionDirective, {static: true}) appQuestion!: QuestionDirective

  constructor( 
    private route: ActivatedRoute, 
    private dialogService: DialogService,
    private componentFactoryResolver: ComponentFactoryResolver 
  ) { }

  ngOnInit(): void {
    this.prefetchQuestions()
    this.loadComponent()
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.dialogService.confirm('Czy chcesz porzucić obecny quiz?');
  }

  private prefetchQuestions() {
    this.route.data.subscribe(data => {
      const questions: QuestionItem | QuestionItem[] = data.questions
      this.questions = this.questions.concat(questions)
      console.log(questions)
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
    console.log('answer captured -> ' + answer)
    this.loadComponent()
  }

}
