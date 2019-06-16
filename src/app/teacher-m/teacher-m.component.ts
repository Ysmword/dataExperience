import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-teacher-m',
  templateUrl: './teacher-m.component.html',
  styleUrls: ['./teacher-m.component.css']
})
export class TeacherMComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.getData()
  }
  role:any

  getData(){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/teacher"
    this.http.post(api,{"teacher":"teacher"},httpOptions).subscribe((response:any)=>{ 
      this.listOfData = response
      console.log(this.listOfData)
    })
  }

  //声明所需要的变量
  listOfData:any[] = []
  isVisible = false  //修改所需要的变量
  TIsvisible = false //添加需要的变量
  TisVisible = false  //查找需要的变量
  Teacher = new FormGroup({
    Tno: new FormControl(''),
    Tname: new FormControl(''),
    Title: new FormControl(''),
    Tsalary: new FormControl(''),
    Password: new FormControl(''),
  });
  addteacher= new FormGroup({
    Tno: new FormControl(''),
    Tname: new FormControl(''),
    Title: new FormControl(''),
    Tsalary: new FormControl(''),
    Password: new FormControl(''),
  });
  SearchTeacher= new FormGroup({
    Tno: new FormControl(''),
    Tname: new FormControl(''),
    Title: new FormControl(''),
    Tsalary: new FormControl(''),
    Password: new FormControl(''),
  });
  teacherNumber = new FormControl('')


  //老师添加，开启的是模态框
  addTeacher(){
    this.TIsvisible = true
    var teacher = new FormGroup({
      Tno: new FormControl(''),
      Tname: new FormControl(''),
      Title: new FormControl(''),
      Tsalary: new FormControl(''),
      Password: new FormControl(''),
    });
    this.addteacher = teacher
  }

  handleOkT(){
    this.TIsvisible = false;
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    console.log(this.addteacher.value["Tno"])
    if(this.addteacher.value["Tno"] === ""){
      this.modalService.success({
        nzTitle: '编号为空'
      });
      return
    }
    if(this.addteacher.value["Tname"] === ""){
      this.modalService.success({
        nzTitle: '姓名为空'
      });
      return
    }
    if(this.addteacher.value["Title"] === ""){
      this.modalService.success({
        nzTitle: '职务为空'
      });
      return
    }
    if(this.addteacher.value["Tsalary"] === ""){
      this.modalService.success({
        nzTitle: '工资为空'
      });
      return
    }
    if(this.addteacher.value["Password"] === ""){
      this.modalService.success({
        nzTitle: '密码为空'
      });
      return
    }
    var api="http://localhost:8000/addteacher"
    this.http.post(api,{"teacher":this.addteacher.value},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '添加成功'
      });
    })
  }

  handleCancelT(){
    this.TIsvisible = false;
  }


   //老师查询的模态框
   Search(){
    var value = this.teacherNumber.value
    if(value===""){
      return
    }
    for (var data of this.listOfData){
      if(value === data.Tno){
        console.log(data.Tno)
        this.TisVisible = true
        var student = new FormGroup({
          Tno: new FormControl(data.Tno),
          Tname: new FormControl(data.Tname),
          Title: new FormControl(data.Title),
          Tsalary: new FormControl(data.Tsalary),
          Password: new FormControl(data.Password),
        });
        this.SearchTeacher = student
        return
      }
    }
    this.modalService.success({
      nzTitle: '没有这个编号'
    });

  }

  handleOks(){
    this.TisVisible = false
  }

  handleCancels(){
    this.TisVisible = false
  }

  //开启修改的对话框
  showModal(data:any){
    this.isVisible = true 
    var teacher = new FormGroup({
      Tno: new FormControl(data.Tno),
      Tname: new FormControl(data.Tname),
      Title: new FormControl(data.Title),
      Tsalary: new FormControl(data.Tsalary),
      Password: new FormControl(data.Password),
    });
    this.Teacher = teacher
  }

  handleOk(){
    this.isVisible = false
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    console.log(this.Teacher.value)
    var api="http://localhost:8000/modifyteacher"
    this.http.post(api,{"teacher":this.Teacher.value},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '修改成功'
      });
    })
  }

  handleCancel(){
    this.isVisible = false
  }

  //删除老师
  deleteTeacher(data:any){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/deleteteacher"
    this.http.post(api,{"teacher":data.Tno},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '删除成功'
      });
    })
  }



}
