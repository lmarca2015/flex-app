import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class LoginComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  submitted = false;

  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  hide = true;
  showIn = false;

  constructor(private _formBuilder: FormBuilder, private api: APIService, private authService: SocialAuthService, private _router: Router) {
    this.loginForm = _formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16)])]
    });
  }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16)])]
    });
  }

  get f() { return this.loginForm.controls; }

  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm) {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.api.login(this.f['username'].value,this.f['password'].value).subscribe((data) => {
      console.log(data);
    });

    this.showIn = true;
    this.loginForm.reset();
    this.formDirective.resetForm();
  }

  onLoad() {
    this._router.navigate(['/home']);
  }

  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
 
    this.authService.signIn(socialPlatformProvider)
    .then((userData) => {
       //on success
       //this will return user data from google. What you need is a user token which you will send it to the server
       alert(userData.idToken);
    });
 }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

}
