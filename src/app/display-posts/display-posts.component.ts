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

  postsListOnCurrentPage;
  allPostList: Post[] = [];
  itemsOnPage: number;
  postId: number;
  objectPerPage: number;
  currentPage: number;
  firstElement: number;
  postsIds: number[];
  postList = [];

  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemsOnPage = 2;
    this.objectPerPage = 3;
    this.postId = 1;
    this.firstElement = 0;
    this.postsIds = [this.currentPage, this.objectPerPage];

    this.httpService.getPosts(this.postsIds, this.postList)
    this.postsListOnCurrentPage = Observable.of(this.postList);
  }

  changePage(currentPage, objectPerPage) {
    if (currentPage === 0) return;
    this.currentPage = currentPage;
    this.firstElement = (this.currentPage-1)*objectPerPage +1;
    this.postsIds = [this.firstElement, objectPerPage];
    
    this.postList = [];

    this.httpService.getPosts(this.postsIds, this.postList)
    this.postsListOnCurrentPage = Observable.of(this.postList);
  }

}
