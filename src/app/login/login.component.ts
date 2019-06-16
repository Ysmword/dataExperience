import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private router:Router
    ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }


  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/login"
    this.http.post(api,{"account":this.validateForm.controls.userName.value,"password":this.validateForm.controls.password.value},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      var number = this.validateForm.controls.userName.value
      if(response.name == "admin"){
        localStorage.setItem("role","admin")
        localStorage.setItem("number",number)
        this.router.navigate(['student'])
      }
      if(response.name == "teacher"){
        localStorage.setItem("role","teacher")
        localStorage.setItem("number",number)
        this.router.navigate(['student'])
      }
      if(response.name == "student"){
        localStorage.setItem("role","student")
        localStorage.setItem("number",number)
        this.router.navigate(['person'])
      }
    })
  }

}
