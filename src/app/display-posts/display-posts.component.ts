import { Component, OnInit, Input, Output} from '@angular/core';
import { DisplayPostService } from './display-post.service';
import { Router } from '@angular/router';
import { Post } from './Post';

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
  objectPerPage: number;
  currentPage: number;
  firstElement: number;

  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemPerPage = 2;
    this.objectPerPage = 2;
    this.postId = 1;
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

  slicer(newNrItems) {
    this.postsListOnCurrentPage = this.allPostList.slice(newNrItems*(this.currentPage-1), newNrItems*this.currentPage);
    this.itemPerPage=newNrItems;
  }

  check(newNrItems) {
    this.firstElement =  this.itemPerPage*(this.currentPage-1);

    if(newNrItems>=this.itemPerPage && this.allPostList.length-((this.currentPage-1)*newNrItems) < newNrItems)
      this.loadAddObjectsPerPage(newNrItems);
    else if(newNrItems>this.itemPerPage && this.allPostList.length >= newNrItems)
      this.dontLoadAddObjectsPerPage(newNrItems);
    else if (newNrItems<this.itemPerPage)
      this.removeObjectFromPage(newNrItems);
    else if (newNrItems==this.itemPerPage)
      this.loadObjectPrevPage();
    
    this.findElementOnPages(newNrItems);
  }

  loadAddObjectsPerPage(newNrItems){
    this.getTwoPost(this.postId).then(()=>{
      if(this.allPostList.length-((this.currentPage-1)*newNrItems) >= newNrItems)
      { 
        if(this.currentPage==1)
        {
          this.postsListOnCurrentPage = this.allPostList.slice(0, newNrItems);
          this.itemPerPage=newNrItems;
        }
        else 
          this.slicer(newNrItems);
      }
      else
        this.loadAddObjectsPerPage(newNrItems);
    });
  }

  dontLoadAddObjectsPerPage(newNrItems) {
    this.findElementOnPages(newNrItems);
    this.slicer(newNrItems); 
  }

  removeObjectFromPage(newNrItems) {
    this.findElementOnPages(newNrItems);
    this.slicer(newNrItems);
  }

  loadObjectPrevPage() {
    this.slicer(this.itemPerPage);
  }

  changePage(newPage, newNrItems){
    if(newPage >= 1 && newPage>this.currentPage)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      this.check(newNrItems);
    }
    else if(newPage >= 1 && newPage<this.currentPage)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      this.check(newNrItems); 
    }
  }

  findElementOnPages(newNrItems) {
    this.currentPage = Math.floor(this.firstElement/newNrItems)+1;
  }

}
