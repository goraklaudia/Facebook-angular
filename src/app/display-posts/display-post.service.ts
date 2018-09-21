import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DisplayPostService {
  i = 0;
  constructor(private http: HttpClient) { }

  getPosts(params: number[], postList) {

    setTimeout(() => {
      this.http.get(`http://jsonplaceholder.typicode.com/posts?id=${params[0]++}`).map(data => { postList.push(data[0]); })
        .subscribe();
    },
      1000 * this.i
    );
    this.i++;

    if (this.i < params[1]) {
      this.getPosts(params, postList)
    }
    this.i = 0;
  }

}
