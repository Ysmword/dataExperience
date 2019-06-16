import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-m',
  templateUrl: './student-m.component.html',
  styleUrls: ['./student-m.component.css']
})
export class StudentMComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private http:HttpClient,
    private router:Router,
    private modalService: NzModalService,
    private fb: FormBuilder,
  ) { 

  }

  ngOnInit() {
    this.getData()
  }
  role:any


  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  listOfData:any[] = []
  isVisible = false
  data:any
  aIsvisible = false
  sisVisible = false
  studnetNumber = new FormControl('');
  student = new FormGroup({
    Sno: new FormControl(''),
    Sname: new FormControl(''),
    Ssex: new FormControl(''),
    Sage: new FormControl(''),
    Password: new FormControl(''),
  });
  addstudent = new FormGroup({
    Sno: new FormControl(''),
    Sname: new FormControl(''),
    Ssex: new FormControl(''),
    Sage: new FormControl(''),
    Password: new FormControl(''),
  });
  Searchstudent = new FormGroup({
    Sno: new FormControl(''),
    Sname: new FormControl(''),
    Ssex: new FormControl(''),
    Sage: new FormControl(''),
    Password: new FormControl(''),
  });

  getData() {
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/student"
    this.http.post(api,{"student":"student"},httpOptions).subscribe((response:any)=>{ 
      this.listOfData = response
    })
  }


  deleteStudent(data:any){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/deletestudent"
    this.http.post(api,{"student":data.Sno},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '操作成功'
      });
    })
  }

  showModal(data:any): void {
    this.isVisible = true;
    var student = new FormGroup({
      Sno: new FormControl(data.Sno),
      Sname: new FormControl(data.Sname),
      Ssex: new FormControl(data.Ssex),
      Sage: new FormControl(data.Sage),
      Password: new FormControl(data.Password),
    });
    this.student = student
  }

  handleOk(): void {
    this.isVisible = false;
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    console.log(this.student.value)
    var api="http://localhost:8000/modifystudent"
    this.http.post(api,{"student":this.student.value},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '修改成功'
      });
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  handleCancela(): void {
    this.aIsvisible = false;
  }

  addStudent(){
    this.aIsvisible = true;
    var student = new FormGroup({
      Sno: new FormControl(''),
      Sname: new FormControl(''),
      Ssex: new FormControl(''),
      Sage: new FormControl(''),
      Password: new FormControl(''),
    });
    this.addstudent = student
  }

  handleOka(){
    this.aIsvisible = false;
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    console.log(this.addstudent.value)
    var api="http://localhost:8000/addstudent"
    this.http.post(api,{"student":this.addstudent.value},httpOptions).subscribe((response:any)=>{ 
      this.getData()
      this.modalService.success({
        nzTitle: '添加成功'
      });
    })
  }

  Search(){
    var value = this.studnetNumber.value
    for (var data of this.listOfData){
      if(value === data.Sno){
        console.log(data.Sno)
        this.sisVisible = true
        var student = new FormGroup({
          Sno: new FormControl(data.Sno),
          Sname: new FormControl(data.Sname),
          Ssex: new FormControl(data.Ssex),
          Sage: new FormControl(data.Sage),
          Password: new FormControl(data.Password),
        });
        this.Searchstudent = student
        return
      }
    }
    this.modalService.success({
      nzTitle: '没有这个学号'
    });
    
    
  }

  handleCancels(){
    this.sisVisible = false
  }
  handleOks(){
    this.sisVisible = false
  }
  
}
