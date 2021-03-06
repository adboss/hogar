import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { email } from '../interfaces';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  apiUrl = "https://api.adboss.io/";
  apiKey = "?key=AIzaSyDkxV8TFM9vP-CTiQlh6-a-8foq_ruKJXU";

  apiAccounting = "https://api.adarga.org/accounting";

  constructor(
  	private http: HttpClient,
    
    ) {}

    sendEmail(myEmail: email): Observable<any>{
      var url = this.apiUrl + "v1/web/email" + this.apiKey + "&app=adargaweb";
      //const params = new HttpParams().set('username', username);
      var myEmailString = JSON.stringify(myEmail);
      console.log(url + " | " + myEmailString);
      var observableReturn = this.http.post<any>(url, myEmailString).pipe(
        tap((any) => console.log("ok")));
      return observableReturn;
    }

    postAccounting(rute: string, obj: string): Observable<any> {

      let url = this.apiAccounting + rute;
      return this.http.post<any>(url, obj).pipe(
        tap((any) => console.log(obj))
      );
    }

    getAccounting(rute: string): Observable<any> {
      let url = this.apiAccounting + rute;
      return this.http.get<any>(url);
    }
  
} 
