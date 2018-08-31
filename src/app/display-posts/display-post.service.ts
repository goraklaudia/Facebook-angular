import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './Post';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class DisplayPostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>('http://jsonplaceholder.typicode.com/posts');
  }
  
}
