import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-uploadfilesuccess',
  templateUrl: './uploadfilesuccess.component.html',
  styleUrls: ['./uploadfilesuccess.component.css']
})
export class UploadfilesuccessComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()){
      this.router.navigateByUrl('')
    }
  }


  logout(){
    console.log('---------------')
    this.auth.logout()
    this.router.navigate([''])
  }

}
