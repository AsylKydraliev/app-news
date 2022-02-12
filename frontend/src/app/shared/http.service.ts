import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { News } from './news.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService{
  news: News[] = [];
  newsChange = new Subject<News[]>();

  constructor(private http: HttpClient) {}

  getNews(){
    this.http.get<News[]>(environment.apiUrl + '/news').pipe(
      map(response => {
        return response.map(news => {
          return new News(
            news.id,
            news.title,
            news.content,
            news.image,
            news.date,
          );
        });
      })
    )
      .subscribe(result => {
        this.news = [];
        this.news = result;
        this.newsChange.next(this.news.slice());
      })
  }
}
