import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor() { }
  public matchChanged = new EventEmitter<void>();

  http= inject(HttpClient);
    //Services section
    createMatch(matchObj:any){
      return this.http.post<any>(`${apiUrls.matchServiceUrl}`,matchObj,{ withCredentials: true });
    }

    getMatches(id:string){
      var res = this.http.get<any>(`${apiUrls.matchServiceUrl}user/${id}`);
      ////console.log(res.data);
      return res;
    }

    
    getAllMatches(id:string){
      var res = this.http.get<any>(`${apiUrls.matchServiceUrl}all/${id}`);
      ////console.log(res.data);
      return res;
    }

    dropMatch(dropMatchObj:any){
      return this.http.post<any>(`${apiUrls.matchServiceUrl}dropmatch`,dropMatchObj,{ withCredentials: true });
    }

    joinMatch(joinMatchObj:any){
      return this.http.post<any>(`${apiUrls.matchServiceUrl}joinmatch`,joinMatchObj,{ withCredentials: true });
    }

    public emitMatchDropped(): void {
      this.matchChanged.emit();
    }
    public emitMatchJoined():void{
      this.matchChanged.emit();
    }
    public emitMatchCreated():void{
      this.matchChanged.emit();
    }
}
