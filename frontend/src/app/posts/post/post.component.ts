import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../shared/news.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  post: News | null = null;
  title = '';
  content = '';
  image = '';
  date = '';

  constructor(private httpService: HttpService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.data.subscribe(data => {
      this.post = <News | null>data['post'];
      console.log(this.post)
    })
  }

}
