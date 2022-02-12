import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { PostComponent } from './posts/post/post.component';
import { ResolverService } from './posts/post/resolver.service';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'addNews', component: AddNewsComponent},
  {path: 'news/:id', component: PostComponent, resolve: {post: ResolverService}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
