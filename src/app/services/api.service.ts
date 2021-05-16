import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { Storage } = Plugins;
import * as urls from '../global/urls';

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  
  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // Load accessToken on startup
  async loadToken() {
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });    
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // Get our secret protected data
  getSecretData() {
    return this.http.get(`${urls.api_url}/users/secret`);
  }

  // Create new user
  signUp(credentials: {username, password}): Observable<any> {
    return this.http.post(`${urls.api_url}/register`, JSON.stringify(credentials));
  }

  // Sign in a user and store access and refres token
  login(credentials: {username, password}): Observable<any> {
    
    return this.http.post(`${urls.api_url}/login`, JSON.stringify(credentials)).pipe(
      switchMap((tokens: {accessToken, refreshToken }) => {
        
        this.currentAccessToken = tokens.accessToken;
        const storeAccess = Storage.set({key: ACCESS_TOKEN_KEY, value: tokens.accessToken});
        const storeRefresh = Storage.set({key: REFRESH_TOKEN_KEY, value: tokens.refreshToken});
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
        
      })
    )
  }

  test(){
    this.http.post(`${urls.api_url}/login`, '{"username":"simon","password":"123456"}').subscribe(data => {
      console.info(data);
    })
  }

  // Potentially perform a logout operation inside your API
  // or simply remove all local tokens and navigate to login
  logout() {
    return this.http.get(`${urls.api_url}/logout`, {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        // Remove all stored tokens
        const deleteAccess = Storage.remove({key: ACCESS_TOKEN_KEY});
        const deleteRefresh = Storage.remove({key: REFRESH_TOKEN_KEY});
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
    ).subscribe();
  }

  // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {    
    const refreshToken = from(Storage.get({ key: REFRESH_TOKEN_KEY }));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: `Bearer ${token.value}`
            })
          }
          return this.http.get(`${urls.api_url}/auth/refresh`, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(Storage.set({key: ACCESS_TOKEN_KEY, value: accessToken}));
  }



/**
 *        ASIENTOS
 */


 gastoCustodia(
        empresa, sociedad, contrato, descripcion, gastoCustodia, fecha
 ){

  let url = urls.api_accounting + "/custodia?empresa=" + empresa 
      + "&sociedad=" + sociedad
      + "&contrato=" + contrato
      + "&descripcion=" + descripcion
      + "&custodia=" + gastoCustodia
      + "&fecha=" + fecha
  console.log(url);
  return this.http.get(url);
}

}