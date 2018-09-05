import { Component, OnInit, Input, Output} from '@angular/core';
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
  itemPerPage: number;
  postId: number;
  twoTimesLoad:number;

  @Input() currentPage: number;
  @Input() amountOfPages: number;


  constructor(private router: Router, private httpService: DisplayPostService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemPerPage = 2;
    this.postId = 1;
    this.twoTimesLoad = 0;
    this.loadTwoPost();
  }

  getPosts(number) {
    return new Promise((resolve, reject) => {
      this.httpService.getPosts(number).subscribe(post => {
        this.postId++;
        resolve(post);
      })
    })
  }

  loadTwoPost() {
    this.getPosts(this.postId)
      .then((data) => {
          if(this.twoTimesLoad!=2)
          {
            this.postsList.push(data[0]);
            this.twoTimesLoad ++;
            console.log("adding");
            this.loadTwoPost();
          }
          else
            this.twoTimesLoad = 0;
          console.log("im in load");
    });
  }

  setObjectsPerPage(number){
    if(number > this.itemPerPage)
    {
      let itemsToLoad = number - this.itemPerPage;
      if( itemsToLoad%2 == 0 )
      {
        for(let i=0; i<itemsToLoad/2; i++)
        {
          this.loadTwoPost();
        }
        
      }


    //   for(let i = this.itemPerPage+1; i<= number; i++)
    //   {
    //     this.postsList.push(data[0]);
    //   }
          
    //   this.itemPerPage = number;
    // }
    // else if (number < this.itemPerPage) 
    // {
    //     this.postsList.splice(number, this.itemPerPage-number);
    //     this.itemPerPage = number;
    // }



    // this.getPosts(this.postId).then((data) => {
    //   if(number > this.itemPerPage)
    //   {
    //     for(let i = this.itemPerPage+1; i<= number; i++)
    //     {
    //       this.postsList.push(data[0]);
    //     }
            
    //     this.itemPerPage = number;
    //   }
    //   else if (number < this.itemPerPage) 
    //   {
    //       this.postsList.splice(number, this.itemPerPage-number);
    //       this.itemPerPage = number;
    //   }

    // });
  }}

  changePage(newPage){
    if(newPage >= 1  )
    {
      this.currentPage = newPage;
    }
      
  }
}
