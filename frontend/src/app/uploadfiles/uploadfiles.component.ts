import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {
  uploadedFiles: Array<File>;
  Allfile: Array<Array<File>>
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()){
      this.router.navigateByUrl('')
    }
    this.Allfile = new Array()
  }
  uploadSubmit(){
    console.log(this.Allfile)
    console.log('////')
    console.log(this.Allfile[0][0].name)
    this.auth.uploadData(this.Allfile)
  }
  uploadFile(event) {
    this.Allfile.push(event)
  }
  deleteAttachment(name) {
    this.Allfile.splice(name, 1)
  }
  logout(){
    // console.log('---------------')
    this.auth.logout()
    this.router.navigate([''])
  }



}
