import { Component, OnInit, Input, Output} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router } from '@angular/router';
import { Post } from './Post';
import { all } from 'q';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit {

  postsListOnCurrentPage: Post[] = [];
  allPostList: Post[] = [];
  itemPerPage: number;
  postId: number;
  twoTimesLoad:number;
  objectPerPage: number;
  currentPage: number;
  firstElement: number;

  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemPerPage = 2;
    this.objectPerPage = 2;
    this.postId = 1;
    this.twoTimesLoad = 0;
    this.firstElement = 0;

    this.getTwoPost(this.postId).then((data)=>{
      for(let i=0; i<2; i++)
          this.postsListOnCurrentPage.push(data[i]);
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
      .then((data)=>{
        data1 = this.getPosts(id+1);
      })
      .then(()=>{
        resolve(data1);
      })
    })
  }

  slicer(number) {
    this.postsListOnCurrentPage = this.allPostList.slice(number*(this.currentPage-1), number*this.currentPage);
    this.itemPerPage=number;
  }

  check(number) {
    this.firstElement =  this.itemPerPage*(this.currentPage-1);
    console.log("first" + this.firstElement);
    if(number>=this.itemPerPage && this.allPostList.length-((this.currentPage-1)*number) < number)
      this.loadAddObjectsPerPage(number);
    else if(number>this.itemPerPage && this.allPostList.length >= number)
      this.dontLoadAddObjectsPerPage(number);
    else if (number<this.itemPerPage)
      this.removeObjectFromPage(number);
    else if (number==this.itemPerPage)
      this.loadObjectPrevPage();
    
    this.findElementOnPages(number);
  }

  loadAddObjectsPerPage(number){
    this.getTwoPost(this.postId).then(()=>{
      if(this.allPostList.length-((this.currentPage-1)*number) >= number)
      { 
        if(this.currentPage==1)
        {
          this.postsListOnCurrentPage = this.allPostList.slice(0, number);
          this.itemPerPage=number;
        }
        else 
          this.slicer(number);
      }
      else
        this.loadAddObjectsPerPage(number);
    });
    this.firstElement =  this.itemPerPage*(this.currentPage-1);
  }

  dontLoadAddObjectsPerPage(number) {
     this.slicer(number);
     this.firstElement =  this.itemPerPage*(this.currentPage-1);
  }

  removeObjectFromPage(number) {
    this.slicer(number);
    this.firstElement =  this.itemPerPage*(this.currentPage-1);
  }

  loadObjectPrevPage() {
    this.slicer(this.itemPerPage);
  }

  changePage(newPage, number){
    if(newPage >= 1 && newPage>this.currentPage)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      this.check(number);
    }
    else if(newPage >= 1 && newPage<this.currentPage)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      this.check(number); 
    }
  }

  findElementOnPages(number) {
    this.currentPage = Math.floor(this.firstElement/number)+1;
    // console.log("first " + this.firstElement );
    console.log("page "+ this.currentPage);
  }

}
