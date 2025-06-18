import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItMyTicketsComponent } from './it-my-tickets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ItMyTicketsComponent', () => {
  let component: ItMyTicketsComponent;
  let fixture: ComponentFixture<ItMyTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItMyTicketsComponent,HttpClientTestingModule],
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

    fixture = TestBed.createComponent(ItMyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
