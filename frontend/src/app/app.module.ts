import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { PredictsignalComponent } from './predictsignal/predictsignal.component';
import { EstimatetrainingComponent } from './estimatetraining/estimatetraining.component';
import { ResultComponent } from './result/result.component';
import { HowtouseComponent } from './howtouse/howtouse.component';
import { UploadfilesuccessComponent } from './uploadfilesuccess/uploadfilesuccess.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { SelectoptionComponent } from './selectoption/selectoption.component';
import { PredictsignalsuccessComponent } from './predictsignalsuccess/predictsignalsuccess.component';
import { RegistsuccessComponent } from './registsuccess/registsuccess.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NgxEchartsModule } from 'ngx-echarts';


const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '', 
    component: LandingpageComponent,
  },
  {
    path: 'uploadfile',
    component: UploadfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'predictsignal',
    component: PredictsignalComponent,
  },
  {
    path: 'estimatetraining',
    component: EstimatetrainingComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
  {
    path: 'howtouse',
    component: HowtouseComponent,
  },
  {
    path: 'uploadfilesuccess',
    component: UploadfilesuccessComponent,
  },
  {
    path: 'uploadfiles',
    component: UploadfilesComponent,
  },
  {
    path: 'selectoption',
    component: SelectoptionComponent,
  },
  {
    path: 'predictsignalsuccess',
    component: PredictsignalsuccessComponent,
  },
  {
    path: 'registsuccess',
    component: RegistsuccessComponent,
  },
  {
    path: 'userprofile',
    component: UserprofileComponent,
  }


]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LandingpageComponent,
    UploadfileComponent,
    PredictsignalComponent,
    EstimatetrainingComponent,
    ResultComponent,
    HowtouseComponent,
    UploadfilesuccessComponent,
    UploadfilesComponent,
    SelectoptionComponent,
    PredictsignalsuccessComponent,
    RegistsuccessComponent,
    UserprofileComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxEchartsModule

  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
