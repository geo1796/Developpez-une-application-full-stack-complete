import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../payload/response/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = 'http://localhost:9000/api/post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id);
  }
}
