import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduledmatchesService {

  getScheduledMatches(userid: string) {

    return {
      "matches": [
        {
          "matchid": 1,
          "ground":
          {
            "name": "Hurst Courts",
            "location": "57 Downing St.",
            "imageurl": "../assets/images/courts/Hurst.jpeg",
            "sports": ["Basketball", "Cricket"]
          },
          "date": "2023-10-22T13:51:50.417-07:00",
          "owner":{},
          "participants":[],
          "requests":[],
          "sport":"Cricket"
        },
        {
          "matchid": 2,
          "ground":
          {
            "name": "Granger Athletic Complex",
          "location": "97 Beaver St.",
          "imageurl": "../assets/images/courts/Granger.jpeg",
          "sports": ["Cricket", "Baseball", "Field Hockey", "Soccer"]
          },
          "date": "2023-10-22T13:51:50.417-07:00",
          "owner":{},
          "participants":[],
          "requests":[],
          "sport":"Soccer"
        },
        {
          "matchid": 2,
          "ground":
          {
            "name": "The Thomas M. and Joan E. Dolan Field House",
            "location": "97 Beaver St.",
            "imageurl": "../assets/images/courts/Dolan.jpeg",
            "sports": ["Basketball", "Cricket"],
          },
          "date": "2023-10-22T13:51:50.417-07:00",
          "owner":{},
          "participants":[],
          "requests":[],
          "sport":"Basketball"
         
        },
        {
          "matchid": 3,
          "ground":
          {
            "name": "The Thomas M. and Joan E. Dolan Field House",
            "location": "97 Beaver St.",
            "imageurl": "../assets/images/courts/Dolan.jpeg",
            "sports": ["Basketball", "Cricket"],
          },
          "date": "2023-10-22T13:51:50.417-07:00",
          "owner":{},
          "participants":[],
          "requests":[],
          "sport":"Basketball"
        },
        {
          "matchid": 3,
          "ground":
          {
            "name": "The Thomas M. and Joan E. Dolan Field House",
            "location": "97 Beaver St.",
            "imageurl": "../assets/images/courts/Dolan.jpeg",
            "sports": ["Basketball", "Cricket"],
          },
          "date": "2023-10-22T13:51:50.417-07:00",
          "owner":{},
          "participants":[],
          "requests":[],
          "sport":"Basketball"
        },
      ]
    }
  }
}
