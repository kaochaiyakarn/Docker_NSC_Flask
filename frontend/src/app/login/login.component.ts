import { Component, OnInit } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  // credentials: TokenPayload = {
  //   _id: '',
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: ''
  // }
  userInformation = {
    userName: '',
    password: '',
    checkPassword: '',
    first_name: '',
    last_name: '',
    sex: '',
    pnumber: '',
    chronic: '',
    fChronic: '',
    email: '',
    addr:'',
    addr2:'',
    city: '',
    state: '',
    zip:''
  }
  constructor(private auth: AuthenticationService, private router: Router) {}
  ngOnInit() {
    if (this.auth.isLoggedIn()){
      this.router.navigateByUrl('/uploadfile')
    }
  }
  login() {
    // console.log(this.userInformation)
    this.auth.login(this.userInformation).subscribe(
      res => {
        console.log(res)
        this.router.navigateByUrl('/uploadfile')
      },
      err => {
        console.error(err)
      }
    )
  }
}
