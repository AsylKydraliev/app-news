import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../shared/news.model';
import { environment } from '../../../environments/environment';
import { Comment } from '../../shared/comment.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  post!: News;
  comments: Comment[] = [];
  api = environment.apiUrl;
  commentsSubscription!: Subscription;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.data.subscribe(data => {
      this.post = <News>data['post'];
    })

    this.commentsSubscription = this.httpService.commentsChange.subscribe(comments => {
      this.comments = comments;
    })

    this.httpService.getComments();
  }

  onSubmit() {
    const comment: Comment = this.form.value;
    this.httpService.createComment(comment).subscribe(() => {
      this.httpService.getComments();
      this.form.resetForm();
    });
  }

  onDelete(id: number) {
    this.httpService.removeComment(id);
  }

  ngOnDestroy(){
    this.commentsSubscription.unsubscribe();
  }
}
