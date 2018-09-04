import { Component, OnInit} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router } from '@angular/router';
import { Post } from './Post';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  postsList: Post[] = [];
  perPage: number = 2;
  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.getPosts().then((data) => {
      for(let i=0; i< this.perPage; i++)
        this.postsList.push(data[i]);
    });
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      this.httpService.getPosts().subscribe(posts => {
        resolve(posts);
      });
    })
  }

  setObjectsPerPage(number){

    this.getPosts().then((data) => {
      if(number > this.perPage)
      {
        for(let i = this.perPage+1; i<= number; i++)
        {
          this.postsList.push(data[i]);
        }
            
        this.perPage = number;
      }
      else if (number < this.perPage) 
      {
          this.postsList.splice(number, this.perPage-number);
          this.perPage = number;
      }

    });
  }
}
