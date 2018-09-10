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
  tmpPage: number;

  currentPage: number;


  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemPerPage = 2;
    this.postId = 1;
    this.twoTimesLoad = 0;
    this.tmpPage = 0;
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

  check(number, pomo) {
    if(number>=this.itemPerPage && this.allPostList.length-((this.currentPage-1)*number) < number)
      this.loadAddObjectsPerPage(number);
    else if(number>this.itemPerPage && this.allPostList.length >= number)
      this.dontLoadAddObjectsPerPage(number, pomo);
    else if (number<this.itemPerPage)
      this.removeObjectFromPage(number);
    else if (number==this.itemPerPage)
      this.loadObjectPrevPage();
  }

  loadAddObjectsPerPage(number){
    this.getTwoPost(this.postId).then(()=>{
      if(this.allPostList.length-((this.currentPage-1)*number) >= number)
      { 
        if(this.currentPage==1)
          this.postsListOnCurrentPage = this.allPostList.slice(0, number);
        else 
          this.postsListOnCurrentPage = this.allPostList.slice(number*(this.currentPage-1), number*this.currentPage);
        this.itemPerPage=number;
      }
      else
        this.loadAddObjectsPerPage(number);
    });
  }

  dontLoadAddObjectsPerPage(number, tmpPage) {
    if(tmpPage!=1)
    {
      this.slicer(number);
    }
    else
    {
      for(let i=this.itemPerPage*(this.currentPage-1); i <this.itemPerPage*this.currentPage; i++)
        this.postsListOnCurrentPage.push(this.allPostList[i]);
      this.itemPerPage=number;
      this.tmpPage = 0;
    }
  }

  removeObjectFromPage(number) {
    this.slicer(number);
  }

  loadObjectPrevPage() {
    this.slicer(this.itemPerPage);
  }

  changePage(newPage, number){
    if(newPage >= 1 && newPage>this.currentPage)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      if(this.itemPerPage*(this.currentPage-1)+2<this.allPostList.length)
        this.tmpPage=1;
      else
        this.tmpPage=0;
      this.check(number, this.tmpPage);
    }
    else if(newPage >= 1 && newPage<this.currentPage)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      this.tmpPage = 1;
      this.check(number,this.tmpPage);
    }
  }
}
