import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material-module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionDirective } from './directives/question.directive';
import { MultipleChoiceQuestionComponent } from './questions/multiple-choice-question/multiple-choice-question.component';
import { BooleanChoiceQuestionComponent } from './questions/boolean-choice-question/boolean-choice-question.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    QuizFormComponent,
    QuizComponent,
    QuestionDirective,
    MultipleChoiceQuestionComponent,
    BooleanChoiceQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
