import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { News } from '../../shared/news.model';

@Injectable({
  providedIn: 'root',
})

export class ResolverService implements Resolve<News>{

  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News> | Observable<never> {
    const id = <number>route.params['id'];
    return this.httpService.getPost(id).pipe(mergeMap(post => {
      if(post) {
        return of(post);
      }else {
        return  EMPTY;
      }
    }))
  }
}
