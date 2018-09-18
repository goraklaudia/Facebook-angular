import { Component, OnInit, Input, Output} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Post } from './Post';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  postsListOnCurrentPage: Post[] = [];
  allPostList: Post[] = [];
  itemsOnPage: number;
  postId: number;
  @Input() currentPage: number;
  @Input() objectPerPage: number;
  firstElement: number;
  httpService: DisplayPostService;
  activatedRoute: ActivatedRoute;

  constructor(httpService: DisplayPostService, activatedRoute: ActivatedRoute) {
    this.httpService = httpService;
    this.activatedRoute = activatedRoute;
    // this.currentPage = 1;
    // this.itemsOnPage = 2;
    this.objectPerPage = 2;
    this.postId = 1;
    this.firstElement = 0;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentPage = params['nrPage'];
      this.objectPerPage = params['nrSize'];
      this.itemsOnPage =  this.objectPerPage;
      this.chooseFun(this.objectPerPage);
    })
    

  }

  
  getPosts(postId) {
    return new Promise((resolve)=>{
    this.httpService.getPosts(postId).subscribe(post => {
      this.allPostList.push(post[0]);
      this.postId ++;
      resolve(this.allPostList);
      })
    });
  }

  getTwoPost(id){
    return new Promise((resolve)=>{
      let data1;
      this.getPosts(id)
      .then(()=>{
        data1 = this.getPosts(id+1);
      })
      .then(()=>{
        resolve(data1);
      })
    })
  }

  slicer(newNrItems) {
    this.postsListOnCurrentPage = this.allPostList.slice(newNrItems*(this.currentPage-1), newNrItems*this.currentPage);
    this.itemsOnPage=newNrItems;
  }

  chooseFun(newNrItems) {
    this.firstElement =  this.itemsOnPage*(this.currentPage-1);
    if(newNrItems>=this.itemsOnPage && this.allPostList.length-((this.currentPage-1)*newNrItems) < newNrItems)
      this.loadSetPostsPerPage(newNrItems);
    else
      this.setPostsPerPageWithoutLoad(newNrItems);
    
    this.findElementOnPages(newNrItems);
  }

  loadSetPostsPerPage(newNrItems){
    this.getTwoPost(this.postId).then(()=>{
      if(this.allPostList.length-((this.currentPage-1)*newNrItems) >= newNrItems)
          this.slicer(newNrItems);
      else
        this.loadSetPostsPerPage(newNrItems);
    });
  }

  setPostsPerPageWithoutLoad(newNrItems) {
    this.findElementOnPages(newNrItems);
    this.slicer(newNrItems); 
  }

  changePage(newPage, newNrItems){
    if(newPage >=1)
    {
      this.currentPage = newPage;
      this.chooseFun(newNrItems); 
    }
  }

  findElementOnPages(newNrItems) {
    this.currentPage = Math.floor(this.firstElement/newNrItems)+1;
  }

}
