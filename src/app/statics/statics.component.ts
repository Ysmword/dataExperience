import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.getData2()
    this.getData()
    this.getData1()
  }
  role:any

  listOfData:any[]=[]  //学生
  listOfData1:any[]=[]  //教师信息
  listOfData3:any[]=[]  //课程信息

  getData1(){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/teacherInfo"
    this.http.post(api,{"teacherInfo":"teacherInfo"},httpOptions).subscribe((response:any)=>{ 
      console.log("获取教务信息",response)
      this.listOfData1 = response
    })
  }


  getData(){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/studentInfo"
    this.http.post(api,{"studentInfo":"studentInfo"},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      this.listOfData = response
    })
  }

  getData2(){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/CSTInof"
    this.http.post(api,{"CSTInof":"CSTInof"},httpOptions).subscribe((response:any)=>{ 
      console.log("都是复制惹的或",response)
      this.listOfData3 = response
    })
  }
} 
