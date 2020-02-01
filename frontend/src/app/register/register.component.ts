import { Component, OnInit } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  ngOnInit() {
    // if (this.auth.isLoggedIn()){
    //   this.router.navigateByUrl('/profile')
    // }
  }
  constructor(private auth: AuthenticationService, private router: Router) {}
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
  tempUsername = 'Enter user name'


  register() {
    console.log(this.userInformation)
    // console.log(this.userInformation.userName)
    this.auth.register(this.userInformation).subscribe(
      res => {
        console.log(res)
        console.log(res['result']['userName'])
        this.router.navigateByUrl('/login')
      },
      err => {
        // console.error(err)
        // console.log('-----')
        console.log(err['error']['error'])
        // this.router.navigateByUrl('/')
      }
    )
  }
}
