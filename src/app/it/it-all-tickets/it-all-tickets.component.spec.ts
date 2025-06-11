import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAllTicketsComponent } from './it-all-tickets.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItAllTicketsComponent', () => {
  let component: ItAllTicketsComponent;
  let fixture: ComponentFixture<ItAllTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItAllTicketsComponent,HttpClientTestingModule],
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

    fixture = TestBed.createComponent(ItAllTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
