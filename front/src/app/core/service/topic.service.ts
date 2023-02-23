import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../payload/response/topic-response';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private url: string = 'http://localhost:9000/api/topic';

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url);
  }
}
