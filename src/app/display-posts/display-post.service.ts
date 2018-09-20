import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './Post';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DisplayPostService {

  constructor(private http: HttpClient) { }

  getPosts(params: number[]): Observable<Post> {
    let postList = [];
    return Observable.from(params)
      .concatMap(id => <Observable<Post>>this.http.get(`http://jsonplaceholder.typicode.com/posts?id=${id}`))
      .do(post => { postList.push(post[0]); })
  }

}
