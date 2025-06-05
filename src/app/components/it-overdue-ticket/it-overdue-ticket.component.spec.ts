import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItOverdueTicketComponent } from './it-overdue-ticket.component';

describe('ItOverdueTicketComponent', () => {
  let component: ItOverdueTicketComponent;
  let fixture: ComponentFixture<ItOverdueTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItOverdueTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItOverdueTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
