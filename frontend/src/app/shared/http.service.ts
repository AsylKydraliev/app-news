import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { News, NewsData } from './news.model';
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

  getPost(id: number) {
    return this.http.get<News | null>(environment.apiUrl + '/news/' + id).pipe(
      map(result => {
        if(!result) return null;
        return new News(
          result.id,
          result.title,
          result.content,
          result.image,
          result.date,
        );
      })
    )
  }

  createNews(news: NewsData) {
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('content', news.content);

    if (news.image) {
      formData.append('image', news.image);
    }

    return this.http.post(environment.apiUrl + '/news', formData);
  }
}
