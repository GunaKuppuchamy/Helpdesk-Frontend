import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTicketsComponent } from './admin-view-tickets.component';

describe('AdminViewTicketsComponent', () => {
  let component: AdminViewTicketsComponent;
  let fixture: ComponentFixture<AdminViewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
