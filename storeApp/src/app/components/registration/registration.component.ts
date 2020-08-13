import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { UserService, User } from 'src/app/service/user.service';
// import { ValidationService } from 'app/validation.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  signUpForm: any;
  signInForm: any;
  signInMessage:string = ' ';
  signUpMessage:string =' ';

  constructor(private formBuilder: FormBuilder,private httpService:HttpService,private userService:UserService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:this.formBuilder.control('',[Validators.required, Validators.minLength(4)]),
      email:this.formBuilder.control('',[Validators.required, Validators.email]),
      password:this.formBuilder.control('',[CustomValidators.validatePassword]),
    })
    this.signInForm = this.formBuilder.group({
      email:this.formBuilder.control('',[Validators.required, Validators.email]),
      password:this.formBuilder.control('',[CustomValidators.validatePassword]),
    })
  }


  get signUpFormControl() {
    return this.signUpForm.controls;
  }
  get signInFormControl() {
    return this.signInForm.controls;
  }

  signUp() {
    this.signUpMessage = null
    this.httpService.signUp(this.signUpForm.value).subscribe(
      data=>{
        this.signUpMessage = 'Signed up successfuly';
        this.signUpForm.markAsPristine()
        this.signUpForm.markAsUntouched()
        this.signUpForm.reset()
      },
      (err:any)=>this.signUpMessage = err.error.message
    )
  }
  signIn() {
    this.signInMessage = null;
    this.httpService.signIn(this.signInForm.value).subscribe(
      (data:User)=>{
        this.signInMessage = 'Logged in Successfully'
        this.userService.putUser(data)
        this.signInForm.markAsPristine()
        this.signInForm.markAsUntouched()
        this.signInForm.reset()
      },
      (err:any)=>this.signInMessage = err.error.message
    )
  }
}

// password validator class
export class CustomValidators extends Validators {
  
  // create a static method for your validation
  static validatePassword(control: FormControl) {
     
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
       
      // match the control value against the regular expression
      // const matches = control.value.match('^(?=.*\d).{4,20}$');
      const matches = /^(?=.*\d).{4,20}$/.test(control.value)
      return matches == false ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
}
