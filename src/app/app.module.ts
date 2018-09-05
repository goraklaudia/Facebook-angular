import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { DisplayPostsComponent } from './display-posts/display-posts.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { DisplayPostService } from './display-posts/display-post.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DisplayPostsComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [DisplayPostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
