import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMComponent } from './teacher-m.component';

describe('TeacherMComponent', () => {
  let component: TeacherMComponent;
  let fixture: ComponentFixture<TeacherMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
