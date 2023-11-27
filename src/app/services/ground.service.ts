import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroundService {

  http= inject(HttpClient);

  getGroundsList():Observable<any>{
    return this.http.get<any>(`${apiUrls.groundServiceUrl}`);
  }
}


    // return {
    //   "courts":[
    //     {
    //       "name":"Hurst Courts",
    //       "location":"57 Downing St.",
    //       "imageurl":"../assets/images/courts/Hurst.jpeg",
    //       "sports":["Basketball","Cricket"],
    //     },
    //     {
    //       "name":"Granger Athletic Complex",
    //       "location":"97 Beaver St.",
    //       "imageurl":"../assets/images/courts/Granger.jpeg",
    //       "sports":["Cricket", "Baseball", "Field Hockey", "Soccer"],
    //     },
    //     {
    //       "name":"The Thomas M. and Joan E. Dolan Field House",
    //       "location":"97 Beaver St.",
    //       "imageurl":"../assets/images/courts/Dolan.jpeg",
    //       "sports":["Basketball", "Cricket"],
    //     },
    //     {
    //       "name":"O'Brien Softball Field",
    //       "location":"58 Knowles Rd.",
    //       "imageurl":"../assets/images/courts/Obrien.jpeg",
    //       "sports":["Softball","Cricket"],
    //     },
    //     {
    //       "name":"Corash Tennis Courts",
    //       "location":" 97 Beaver St.",
    //       "imageurl":"../assets/images/courts/Corash_1.jpeg",
    //       "sports":["Tennis"],
    //     },
    //   ],
    //   "sports":[
    //     "Cricket", "Softball", "Baseball", "Tennis","Field Hockey", "Basketball","Soccer"
    //   ]
    // }