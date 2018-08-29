import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DisplayPostsComponent } from './display-posts/display-posts.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  {path:'display-posts', component: DisplayPostsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DisplayPostsComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
