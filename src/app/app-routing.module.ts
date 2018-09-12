import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DisplayPostsComponent } from './display-posts/display-posts.component';

const appRoutes: Routes = [
  {path:'display-posts', component: DisplayPostsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
  ],
  declarations: []
})
export class AppRoutingModule { }
