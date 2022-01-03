import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRdvFormComponent } from './new-rdv-form.component';

describe('NewRdvFormComponent', () => {
  let component: NewRdvFormComponent;
  let fixture: ComponentFixture<NewRdvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRdvFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRdvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
