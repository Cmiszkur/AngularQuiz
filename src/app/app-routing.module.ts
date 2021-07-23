import { QuestionResolverService } from './services/question-resolver.service';
import { AuthGuard } from './auth.guard';
import { QuizComponent } from './quiz/quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: QuizFormComponent, data: { animation: 'form' } },
  { 
    path: 'quiz/:quantity', 
    component: QuizComponent, 
    data: { animation: 'quiz' }, 
    canDeactivate: [AuthGuard],
    resolve: { questions: QuestionResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
