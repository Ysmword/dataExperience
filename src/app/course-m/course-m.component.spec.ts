import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMComponent } from './course-m.component';

describe('CourseMComponent', () => {
  let component: CourseMComponent;
  let fixture: ComponentFixture<CourseMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
