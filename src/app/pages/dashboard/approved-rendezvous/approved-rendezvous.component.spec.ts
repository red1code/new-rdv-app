import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRendezvousComponent } from './approved-rendezvous.component';

describe('ApprovedRendezvousComponent', () => {
  let component: ApprovedRendezvousComponent;
  let fixture: ComponentFixture<ApprovedRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
