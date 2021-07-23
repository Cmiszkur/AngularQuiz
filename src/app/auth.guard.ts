import { QuizComponent } from './quiz/quiz.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanDeactivate<QuizComponent> {
  canDeactivate(
    component: QuizComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
      return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
