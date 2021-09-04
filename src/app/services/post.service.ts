import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Subject } from 'rxjs';

import { News } from 'src/app/news';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // error = new Subject();

  constructor(private http: HttpClient) { }

  onFetch(){
    return this.http.get<{[key:string]: News}>('https://test-10eca-default-rtdb.firebaseio.com/news.json')
    .pipe(
      map(
        responseData => {
          const dataArray: News[] = [];
          for(const key in responseData)
          {
            if(responseData.hasOwnProperty(key))
            {
              dataArray.push({ ...responseData[key], id: key});
            }
          }
        return dataArray;
      }))
    }


    insertData(form:News){
      //const myForm: News = {name:name, content:content}
     return this.http.post<News>('https://test-10eca-default-rtdb.firebaseio.com/news.json', form)
    }

    deleteData(data: News){
      return this.http.delete(`https://test-10eca-default-rtdb.firebaseio.com/news/${data.id}.json`)
    }

    updateData(data: News){
      return this.http.put(`https://test-10eca-default-rtdb.firebaseio.com/news/${data.id}.json`, data)
    }


}
