import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './Post';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DisplayPostService {

  constructor(private http: HttpClient) { }

  getPosts(params: number[], postList) {
    let id = params[0];
    for (let i = 0; i < params[1]; i++) {
      setTimeout(() => {
        this.http.get(`http://jsonplaceholder.typicode.com/posts?id=${id++}`).map(data => { postList.push(data[0]); }).subscribe();
      },
        1000 * i
      );

    }
  }

}
