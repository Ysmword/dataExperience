import { Component, OnInit } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  IsSign = false
  Info:any

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  studentM = false
  teacherM = false
  courseM = false
  statics = false
  person = false
  role:any

  ngOnInit() {
    this.IsSign = false
    this.router.events.subscribe((event)=>{
      const httpOptions={
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      var api="http://localhost:8000/IsSign"
      this.http.post(api,{"角色":"角色"},httpOptions).subscribe((response:any)=>{ 
        this.IsSign = response
        this.role = localStorage.getItem("role")
        if(this.role == "admin"){
          this.studentM = true
          this.teacherM = true
          this.courseM = true
          this.statics = true
          this.person = false
        }
        if(this.role == "student"){
          this.studentM = false
          this.teacherM = false
          this.courseM = false
          this.statics = false
          this.person = true
        }
      })
    })
  }

  cancel(){
    // this.IsSign = false
    localStorage.clear()
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/cancel"
    this.http.post(api,{"角色":"角色"},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      this.IsSign = response
      this.router.navigate(["/login"])
    })
  }

}
