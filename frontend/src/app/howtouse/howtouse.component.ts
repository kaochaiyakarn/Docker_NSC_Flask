import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';


@Component({
  selector: 'app-howtouse',
  templateUrl: './howtouse.component.html',
  styleUrls: ['./howtouse.component.css']
})
export class HowtouseComponent implements OnInit {

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
