import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzModalService, NzInputDirective } from 'ng-zorro-antd';

@Component({
  selector: 'app-elective',
  templateUrl: './elective.component.html',
  styleUrls: ['./elective.component.css']
})
export class ElectiveComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private modalService: NzModalService,
  ) { }

  editId: string | null;
  @ViewChild(NzInputDirective, { read: ElementRef }) inputElement: ElementRef;

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null;
    }
  }


  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }

  ngOnInit() {
    var data = localStorage.getItem("role")
    if(data == "student"){
      this.IsStudent = true
      this.getData()
    }
    if(data == "admin"){
      this.IsAdmin = true
      this.AgetDataSC()
    }
  }

  listOfData:any[]=[]
  IsStudent=false
  IsAdmin = false

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

  Add(data:any){
    var Sno = localStorage.getItem("number")
    var Cno = data.Cno
    console.log(Sno,Cno)
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/studentAddCourse"
    this.http.post(api,{"Sno":Sno,"Cno":Cno},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      if(response=="成功"){
        this.modalService.success({
          nzTitle: '成功'
        });
      }else{
        this.modalService.success({
          nzTitle: '添加失败'
        });
      }
    })
  }

  deleteStudentCourse(data:any){
    var Sno = localStorage.getItem("number")
    var Cno = data.Cno
    console.log(Sno,Cno)
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/deleteStudentCourse"
    this.http.post(api,{"Sno":Sno,"Cno":Cno},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      if(response=="成功"){
        this.modalService.success({
          nzTitle: '删除课程成功'
        });
      }
      if(response =="你还没选修这门课程"){
        this.modalService.success({
          nzTitle: '你还没选修这门课程'
        });
      }
    })
  }

  //管理员获取所有学生的信息
  AgetDataSC(){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/AgetDataSC"
    this.http.post(api,{"AgetData":"AgetDataSC"},httpOptions).subscribe((response:any)=>{ 
      console.log(response)
      this.listOfData = response
    })
  }

  //修改信息
  modifySC(data:any){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    console.log(data)
    var api="http://localhost:8000/modifySC"
    this.http.post(api,{"data":data},httpOptions).subscribe((response:any)=>{ 
     console.log(response)
     if(response.data=="成功"){
      this.AgetDataSC()
      this.modalService.success({
        nzTitle: '修改成功'
      });
    }
    })
  }
}
