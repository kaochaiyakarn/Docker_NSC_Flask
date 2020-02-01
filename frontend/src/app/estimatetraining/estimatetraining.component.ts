import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-estimatetraining',
  templateUrl: './estimatetraining.component.html',
  styleUrls: ['./estimatetraining.component.css']
})
export class EstimatetrainingComponent implements OnInit {

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
