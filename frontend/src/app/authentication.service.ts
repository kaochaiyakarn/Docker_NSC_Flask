import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string
  userName:string
  password: string
  sex:string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}
export interface mockdata {
  test: string
}
export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  sex:string
  password: string
}
// export interface 

interface userInformation {
  userName: string,
  password: string,
  checkPassword: string,
  first_name: string,
  last_name: string,
  sex: string,
  pnumber: string,
  chronic: string,
  fChronic: string,
  email: string,
  addr:string,
  addr2:string,
  city: string,
  state: string,
  zip:string
}

@Injectable()
export class AuthenticationService {
  private token: string
  private api_environment = 'http://172.18.0.3:8080'
  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public mockupdata(){
    const test = {
      test: 'kao'
    }
    return this.http.post(this.api_environment + '/users/mock',test)
  }

  public uploadData(data){
    console.log('Service')
    console.log(data[0][0])
    console.log(typeof(data[0][0]))

    this.http.post(this.api_environment + '/users/upload',data[0][0]).subscribe(
      res => {
        console.log(res)
      }
    )
    return null
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: userInformation): Observable<any> {
    const base = this.http.post(this.api_environment+'/users/register', user)
    console.log(user)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
          console.log('456')
        }
        console.log('123')
        return data
      })
    )
    console.log('098')
    return request
  }

  public login(user: userInformation): Observable<any> {
    const base = this.http.post(this.api_environment+'/users/login', user)
    console.log(user)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
