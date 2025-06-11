import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItOverdueTicketComponent } from './it-overdue-ticket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ItOverdueTicketComponent', () => {
  let component: ItOverdueTicketComponent;
  let fixture: ComponentFixture<ItOverdueTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItOverdueTicketComponent,HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mocked route param
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '123';
                  return null;
                }
              }
            }
          }
        }
      ]



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
