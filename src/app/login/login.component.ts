import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { userData } from '../model/userData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  displayRegisterForm: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  register() {
    const user = this.registerForm.getRawValue();
    userData.push(user);
    this.toastr.success("Sucess", "The user is registered Successfully");
    this.displayRegisterForm = false;
  }

  login() {
    const user = this.loginForm.getRawValue();
    const loggedInUser = userData.filter((userData: User) => userData.userName === user.userName && userData.password === user.password);
    if (loggedInUser.length > 0) {
      localStorage.setItem("USER", user.userName);
      this.toastr.success("The user is logged in Successfully", "Sucess");
      this.router.navigate(['/']);
    } 
    else {
      this.toastr.error("The user credentials are wrong", "Error");
    }
  }
}
