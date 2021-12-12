import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRendezvousComponent } from './my-rendezvous.component';

describe('MyRendezvousComponent', () => {
  let component: MyRendezvousComponent;
  let fixture: ComponentFixture<MyRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
