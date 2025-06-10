import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItMyTicketsComponent } from './it-my-tickets.component';

describe('ItMyTicketsComponent', () => {
  let component: ItMyTicketsComponent;
  let fixture: ComponentFixture<ItMyTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItMyTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItMyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
