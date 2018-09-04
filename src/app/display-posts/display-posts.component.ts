import { Component, OnInit} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router } from '@angular/router';
import { Post } from './Post';
import { resolve } from 'q';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  postsList: Post[];

  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.getPosts().then((data) => {
      for(let i=0; i<2; i++)
      {
        console.log("blajfkls");
        console.log(data[0]);
        this.postsList[i] = data[i];
      }
        
    });
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      this.httpService.getPosts().subscribe(posts => {
        resolve(posts);
      });
    })
  }


}
