import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMComponent } from './student-m.component';

describe('StudentMComponent', () => {
  let component: StudentMComponent;
  let fixture: ComponentFixture<StudentMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
