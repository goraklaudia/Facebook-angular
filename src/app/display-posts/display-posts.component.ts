import { Component, OnInit, Input, Output} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router } from '@angular/router';
import { Post } from './Post';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  postsListOnCurrentPage: Observable<Post>;
  allPostList: Post[] = [];
  itemsOnPage: number;
  postId: number;
  objectPerPage: number;
  currentPage: number;
  firstElement: number;
  postsIds: number[];

  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemsOnPage = 2;
    this.objectPerPage = 2;
    this.postId = 1;
    this.firstElement = 0;
    this.postsIds = [1,2,3];

    this.postsListOnCurrentPage = this.httpService.getPosts(this.postsIds);
  }


}
