import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAllTicketsComponent } from './it-all-tickets.component';

describe('ItAllTicketsComponent', () => {
  let component: ItAllTicketsComponent;
  let fixture: ComponentFixture<ItAllTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItAllTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItAllTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
