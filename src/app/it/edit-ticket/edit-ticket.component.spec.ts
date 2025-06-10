import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTicketComponent } from './edit-ticket.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditTicketComponent', () => {
  let component: EditTicketComponent;
  let fixture: ComponentFixture<EditTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EditTicketComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => {
                if (key === 'id') return '123';
                return null;
              }
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
