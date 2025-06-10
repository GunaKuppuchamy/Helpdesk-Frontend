import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUsersComponent } from './admin-view-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AdminViewUsersComponent', () => {
  let component: AdminViewUsersComponent;
  let fixture: ComponentFixture<AdminViewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewUsersComponent,HttpClientTestingModule],
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

    fixture = TestBed.createComponent(AdminViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
