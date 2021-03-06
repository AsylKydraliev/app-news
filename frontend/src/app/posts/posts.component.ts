import { Component, OnDestroy, OnInit } from '@angular/core';
import { News } from '../shared/news.model';
import { HttpService } from '../shared/http.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  newsSubscription!: Subscription;
  api = environment.apiUrl;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.newsSubscription = this.httpService.newsChange.subscribe(news => {
      this.news = news;
    });

    this.httpService.getNews();
  }

  onRead(id: number) {
    this.httpService.getPost(id);
  }

  onDelete(id: number) {
    this.httpService.removePost(id);
  }

  ngOnDestroy (){
    this.newsSubscription.unsubscribe();
  }
}
