import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPartComponent } from './users-part.component';

describe('UsersPartComponent', () => {
  let component: UsersPartComponent;
  let fixture: ComponentFixture<UsersPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
