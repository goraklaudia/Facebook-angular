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
  twoTimesLoad:number;

  @Input() currentPage: number;


  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemPerPage = 2;
    this.postId = 1;
    this.twoTimesLoad = 0;
    this.getTwoPost(this.postId).then((data)=>{
      for(let i=0; i<2; i++)
        {
          this.postsListOnCurrentPage.push(data[i]);
        }
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

  check(number) {
    if(number>this.itemPerPage && this.allPostList.length-((this.currentPage-1)*number) < number)
      this.loadAddObjectsPerPage(number);
    else if(number>this.itemPerPage && this.allPostList.length >= number)
      this.dontLoadAddObjectsPerPage(number);
    else if (number<this.itemPerPage)
      this.removeObjectFromPage(number);
  }

  loadAddObjectsPerPage(number){
    this.getTwoPost(this.postId).then(()=>{
      console.log("all posts ");
      console.log(this.allPostList);
      if(this.allPostList.length-((this.currentPage-1)*number) >= number)
      {
        console.log("ilosc "+this.itemPerPage);
        console.log("numer " + number);
        for(let i = this.itemPerPage + number*(this.currentPage-1); i < number*this.currentPage; i++)
        {
          this.postsListOnCurrentPage.push(this.allPostList[i]);
        }
        this.itemPerPage=number;
        console.log("postyy na stronie" );
        console.log(this.postsListOnCurrentPage);
        console.log("blabla");
      }
      else
        this.loadAddObjectsPerPage(number);
    });

  }

  dontLoadAddObjectsPerPage(number) {
    for(let i=this.itemPerPage; i<number; i++)
    {
      this.postsListOnCurrentPage.push(this.allPostList[i]);
    }
    this.itemPerPage=number;
  }

  removeObjectFromPage(number) {

  }

  changePage(newPage, number){
    if(newPage >= 1 && newPage>this.currentPage && this.allPostList.length-(this.itemPerPage*this.currentPage) == 1)
    {
      this.currentPage = newPage;
      this.postsListOnCurrentPage.splice(0,this.itemPerPage);
      console.log(this.postsListOnCurrentPage);
      this.itemPerPage = 0;
      this.check(number);
      console.log(this.postsListOnCurrentPage);
    }
  }
}
