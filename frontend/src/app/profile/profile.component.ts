import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails

  constructor(private auth: AuthenticationService, private router: Router) { }

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

  ngOnInit() {
    if (!this.auth.isLoggedIn()){
      this.router.navigateByUrl('')
    }


    this.details = this.auth.getUserDetails()
    console.log(this.details)

    this.userInformation['userName'] = this.details['identity']['userName']
    this.userInformation['first_name'] = this.details['identity']['first_name']
    this.userInformation['last_name'] = this.details['identity']['last_name']
    this.userInformation['sex'] = this.details['identity']['sex']

  }

  logout(){
    console.log('---------------')
    this.auth.logout()
    this.router.navigate([''])
  }

}
