import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(@Inject('baseURL') private baseURL: string, private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(this.baseURL + url);
  }

}
