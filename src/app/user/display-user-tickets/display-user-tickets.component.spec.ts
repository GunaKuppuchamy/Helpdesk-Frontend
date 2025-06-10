import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserTicketsComponent } from './display-user-tickets.component';

describe('DisplayUserTicketsComponent', () => {
  let component: DisplayUserTicketsComponent;
  let fixture: ComponentFixture<DisplayUserTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayUserTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayUserTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
