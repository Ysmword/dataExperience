import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-course-m',
  templateUrl: './course-m.component.html',
  styleUrls: ['./course-m.component.css']
})
export class CourseMComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    this.getData()
  }

  role:any

  getData(){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/course"
    this.http.post(api,{"course":"course"},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      this.listOfData = response
    })
  }

  CourseNumber = new FormControl('');
  listOfData:any[]=[]
  isVisible = false   //修改
  aIsvisible = false  //添加
  sisVisible = false  //查找
  Course = new FormGroup({
    Cno: new FormControl(''),
    Cname: new FormControl(''),
    Credit: new FormControl(''),
  });
  addcourse = new FormGroup({
    Cno: new FormControl(''),
    Cname: new FormControl(''),
    Credit: new FormControl(''),
  });
  SearchCourse = new FormGroup({
    Cno: new FormControl(''),
    Cname: new FormControl(''),
    Credit: new FormControl(''),
  });

  //添加课程
  addCourse(){
    this.aIsvisible = true
    var course = new FormGroup({
      Cno: new FormControl(''),
      Cname: new FormControl(''),
      Credit: new FormControl(''),
    });
    this.addcourse = course
    
  }
  handleCancela(){
    this.aIsvisible = false
    
  }
  handleOka(){
    console.log("Dayin")
    if(this.addcourse.value["Cno"] === ""){
      this.modalService.success({
        nzTitle: '编号为空'
      });
      return
    }
    if(this.addcourse.value["Cname"] === ""){
      this.modalService.success({
        nzTitle: '课程名为空'
      });
      return
    }
    if(this.addcourse.value["Credit"] === ""){
      this.modalService.success({
        nzTitle: '学分为空'
      });
      return
    }
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/addcourse"
    this.http.post(api,{"course":this.addcourse.value},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '添加成功'
      });
    })
    this.aIsvisible = false
  }
  //查找课程
  Search(){
    var value = this.CourseNumber.value
    if(value===""){
      return
    }
    for (var data of this.listOfData){
      if(value === data.Cno){
        console.log(data.Cno)
        this.sisVisible = true
        var course = new FormGroup({
          Cno: new FormControl(data.Cno),
          Cname: new FormControl(data.Cname),
          Credit: new FormControl(data.Credit),
        });
        this.SearchCourse = course
        return
      }
    }
    this.modalService.success({
      nzTitle: '没有这个课程号'
    });
    
  }
  handleOks(){
    this.sisVisible = false
  }
  handleCancels(){
    this.sisVisible = false
  }

  //修改
  showModal(data:any){
    this.isVisible = true 
    var course = new FormGroup({
      Cno: new FormControl(data.Cno),
      Cname: new FormControl(data.Cname),
      Credit: new FormControl(data.Credit),
    });
    this.Course = course
  }
  handleOk(){
    if(this.Course.value["Cno"] === ""){
      this.modalService.success({
        nzTitle: '编号为空'
      });
      return
    }
    if(this.Course.value["Cname"] === ""){
      this.modalService.success({
        nzTitle: '课程名为空'
      });
      return
    }
    if(this.Course.value["Credit"] === ""){
      this.modalService.success({
        nzTitle: '学分为空'
      });
      return
    }
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    console.log(this.Course.value)
    var api="http://localhost:8000/modifyCourse"
    this.http.post(api,{"course":this.Course.value},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '修改成功'
      });
    })
  }
  handleCancel(){
    this.isVisible = false
  }

  //删除
  deleteCourse(data:any){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/deletecourse"
    this.http.post(api,{"course":data.Cno},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '操作成功'
      });
    })
  }
}
