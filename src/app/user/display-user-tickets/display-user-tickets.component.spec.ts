import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserTicketsComponent } from './display-user-tickets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('DisplayUserTicketsComponent', () => {
  let component: DisplayUserTicketsComponent;
  let fixture: ComponentFixture<DisplayUserTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayUserTicketsComponent,HttpClientTestingModule],
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

    fixture = TestBed.createComponent(DisplayUserTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
