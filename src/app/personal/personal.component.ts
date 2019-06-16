import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    
    this.role = localStorage.getItem("role")
    this.number = localStorage.getItem("number")
    if(this.role == "student"){
      const httpOptions={
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      var api="http://localhost:8000/getdata"
      this.http.post(api,{"number":this.number,"role":this.role},httpOptions).subscribe((response:any)=>{ 
        var student =  new FormGroup({
          Sno : new FormControl(response.Sno),
          Sname : new FormControl(response.Sname),
          Ssex : new FormControl(response.Ssex),
          Sage : new FormControl(response.Sage),
          Password : new FormControl(response.Password)
        })
        this.student = student
      })
    }
  }

  role:any
  number:any

  //老师的个人信息
  teacher = new FormGroup({
    Tno : new FormControl(''),
    Tname : new FormControl(''),
    Title : new FormControl(''),
    Tsalary : new FormControl(''),
    Password : new FormControl('')
  })

  //学生的个人信息
  student =  new FormGroup({
    Sno : new FormControl(''),
    Sname : new FormControl(''),
    Ssex : new FormControl(''),
    Sage : new FormControl(''),
    Password : new FormControl('')
  })

  onSubmit(data:any){
    this.role = localStorage.getItem("role")
    this.number = localStorage.getItem("number")
    if(this.role == "student"){
      const httpOptions={
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      // console.log(this.student.value)
      var api="http://localhost:8000/modifystudent"
      this.http.post(api,{"student":this.student.value},httpOptions).subscribe((response:any)=>{ 
        this.modalService.success({
          nzTitle: '修改成功'
        });
      })
    }
  }
  



}
