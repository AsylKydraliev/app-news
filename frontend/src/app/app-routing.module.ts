import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { AddNewsComponent } from './add-news/add-news.component';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'addNews', component: AddNewsComponent},
  {path: ':id', component: CommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
