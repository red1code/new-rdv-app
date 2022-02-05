import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvsPartComponent } from './rdvs-part.component';

describe('RdvsPartComponent', () => {
  let component: RdvsPartComponent;
  let fixture: ComponentFixture<RdvsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
