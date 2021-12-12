import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFounedComponent } from './not-founed.component';

describe('NotFounedComponent', () => {
  let component: NotFounedComponent;
  let fixture: ComponentFixture<NotFounedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFounedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFounedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
