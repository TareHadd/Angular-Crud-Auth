import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Praviš sad subjekt od usera iz services/user radi logina da bi znao koji je user logiran 
  user = new BehaviorSubject<User>(null)

  // Timer za logout
  private tokenExpTimer:any;

  constructor(private http:HttpClient, private router: Router) { }

  onSignupFunct(email:string,password:string)
  {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeGvkTAVu3MJaDjW-ThsLyX3jetUIpmT4',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    )
  }
  
  onLogin(email:string, password:string){
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeGvkTAVu3MJaDjW-ThsLyX3jetUIpmT4',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }


  autoLogin(){
    const userDataFromLocal: {
      email:string,
      id:string,
      _token:string,
      _tokenExpDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userDataFromLocal){
      return;
    }

    const autoLoadedUser = new User(
      userDataFromLocal.email, 
      userDataFromLocal.id, 
      userDataFromLocal._token, 
      new Date(userDataFromLocal._tokenExpDate));
    
      if (autoLoadedUser.token){

        this.user.next(autoLoadedUser);

        // Oduzmemo da bi dobili koliko je vremena ostalo do auto logout
        const expiration = new Date(userDataFromLocal._tokenExpDate).getTime() 
        - //ovo je minus
        new Date().getTime();

        this.autoLogout(expiration);
      }

      if (this.tokenExpTimer){
        clearTimeout(this.tokenExpTimer);
      }

      this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number){
    this.tokenExpTimer = setTimeout(()=>{
      this.logout();
    }, expDuration)
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An error occurred!"
    return throwError(errorMessage);
  }

  private handleAuth(
    email:string,
    id: string,
    token: string,
    expDate: number
    ){
      const exiprationDate = new Date(new Date().getTime() + expDate * 1000);
      const user = new User(email, id, token, exiprationDate);
      this.user.next(user);
      this.autoLogout(expDate * 1000);
      localStorage.setItem('userData', JSON.stringify(user));

    }

}
