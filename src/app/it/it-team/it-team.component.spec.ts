import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItTeamComponent } from './it-team.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ItTeamComponent', () => {
  let component: ItTeamComponent;
  let fixture: ComponentFixture<ItTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItTeamComponent,HttpClientTestingModule],
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

    fixture = TestBed.createComponent(ItTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
