import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRendezvousComponent } from './pending-rendezvous.component';

describe('PendingRendezvousComponent', () => {
  let component: PendingRendezvousComponent;
  let fixture: ComponentFixture<PendingRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingRendezvousComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
