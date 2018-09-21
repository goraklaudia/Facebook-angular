import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { DisplayPostsComponent } from './display-posts/display-posts.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { DisplayPostService } from './display-posts/display-post.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DisplayPostsComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    FormsModule
  ],
  providers: [DisplayPostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
