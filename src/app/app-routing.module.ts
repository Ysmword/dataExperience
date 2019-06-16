import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StudentMComponent} from "./student-m/student-m.component"
import {TeacherMComponent} from "./teacher-m/teacher-m.component"
import {CourseMComponent} from "./course-m/course-m.component"
import {StaticsComponent} from "./statics/statics.component"
import {PersonalComponent} from "./personal/personal.component"
import {ElectiveComponent} from "./elective/elective.component"

const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:"student",component:StudentMComponent},
  {path:"teacher",component:TeacherMComponent},
  {path:"course",component:CourseMComponent},
  {path:"statics",component:StaticsComponent},
  {path:"person",component:PersonalComponent},
  {path:"elective",component:ElectiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
