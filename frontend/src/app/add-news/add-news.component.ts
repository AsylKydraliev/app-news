import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import { NewsData } from '../shared/news.model';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.sass']
})
export class AddNewsComponent {
  @ViewChild('form') form!: NgForm;

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  onSubmit() {
    const news: NewsData = this.form.value;
    this.httpService.createNews(news).subscribe(() => {
      void this.router.navigate(['/']);
    });
  }

}
