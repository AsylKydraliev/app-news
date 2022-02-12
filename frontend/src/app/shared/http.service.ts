import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { News, NewsData } from './news.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService{
  news: News[] = [];
  comments: Comment[] = [];
  newsChange = new Subject<News[]>();
  commentsChange = new Subject<Comment[]>();
  postId!: number;

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
    this.postId = id;
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

  getComments(){
    this.http.get<Comment[]>(environment.apiUrl + '/comments?post_id=' + this.postId).pipe(
      map(response => {
        return response.map(comment => {
          return new Comment(
            comment.id,
            comment.postId,
            comment.author,
            comment.comment
          );
        });
      })
    )
      .subscribe(result => {
        this.comments = [];
        this.comments = result;
        this.commentsChange.next(this.comments.slice());
      })
  }

  createComment(comment: Comment){
    const body = {
      post_id: this.postId,
      author: comment.author,
      comment: comment.comment
    }
    return this.http.post(environment.apiUrl + '/comments', body);
  }

  removePost(id: number){
    this.http.delete(environment.apiUrl + '/news/' + id).subscribe(() => {
      this.getNews();
    });
  }

  removeComment(id: number){
    this.http.delete(environment.apiUrl + '/comments/' + id).subscribe(() => {
      this.getComments();
    });
  }
}
