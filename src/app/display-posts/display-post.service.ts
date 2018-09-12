import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './Post';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DisplayPostService {

  data: any;
  constructor(private http: HttpClient) { }

  getPosts(param): Observable<Post> {
    return this.http.get<Post>('http://jsonplaceholder.typicode.com/posts', {params: new HttpParams().set('id', param)});
  }
}
