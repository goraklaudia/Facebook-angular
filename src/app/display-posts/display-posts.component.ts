import { Component, OnInit} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router } from '@angular/router';
import { Post } from './Post';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  postsList: Array<Post>;
  perPage: number;

  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.httpService.getPosts().subscribe(posts => {
      this.postsList = posts;
      console.log(this.postsList);
    })
  }
  setValueOfObject(objectPerPage) {
    this.perPage = objectPerPage;
    console.log(this.perPage);
  }

}
