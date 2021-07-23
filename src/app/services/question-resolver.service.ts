import { QuestionItem } from './../Question-Item';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class QuestionResolverService implements Resolve<QuestionItem | QuestionItem[]> {
  constructor(private qs: QuestionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuestionItem[] | QuestionItem | never> {
    const quantity = route.paramMap.get('quantity')
    const category = route.paramMap.get('category')
    const difficulty = route.paramMap.get('difficulty')

    return this.qs.getQuestions(quantity, category, difficulty).pipe(
      take(1),
      mergeMap(questions => {
        if (questions) {
          return of(questions);
        } else { 
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}