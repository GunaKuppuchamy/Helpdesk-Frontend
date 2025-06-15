// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AdminViewTicketsComponent } from './admin-view-tickets.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';

// describe('AdminViewTicketsComponent', () => {
//   let component: AdminViewTicketsComponent;
//   let fixture: ComponentFixture<AdminViewTicketsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AdminViewTicketsComponent,HttpClientTestingModule],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             params: of({ id: '123' }), // Mocked route param
//             snapshot: {
//               paramMap: {
//                 get: (key: string) => {
//                   if (key === 'id') return '123'; 
//                   return null;
//                 }
//               }
//             }
//           }
//         }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AdminViewTicketsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminViewTicketsComponent } from './admin-view-tickets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TicketsService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth-service.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../models/ticket.type';

describe('AdminViewTicketsComponent', () => {
  let component: AdminViewTicketsComponent;
  let fixture: ComponentFixture<AdminViewTicketsComponent>;
  let mockTicketsService: jasmine.SpyObj<TicketsService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockTicketsService = jasmine.createSpyObj('TicketsService', ['getTicketAPI']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'isLoggedOut']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,AdminViewTicketsComponent],
      
      providers: [
        { provide: TicketsService, useValue: mockTicketsService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? '123' : null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminViewTicketsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockAuthService.isLoggedIn.and.callFake(() => {true});
    mockTicketsService.getTicketAPI.and.returnValue(of(new HttpResponse({ body: [] })));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load ticket data into allTickets', () => {
  const mockTickets: Ticket[] = [
    {
      _id: '1',
      subject: 'System not booting',
      categeory: 'Hardware',
      description: 'Laptop fails to start',
      status: 'open',
      priroty: 'high',
      userid: 'user123',
      itid: 'it456',
      duedate: new Date(),
      raiseddate: new Date()
    }
  ];

  mockAuthService.isLoggedIn.and.callFake(() => {true});
  mockTicketsService.getTicketAPI.and.returnValue(
    of(new HttpResponse<Ticket[]>({ body: mockTickets }))
  );

  fixture.detectChanges();

  expect(component.allTickets.length).toBe(1);
  expect(component.allTickets).toEqual(mockTickets);
});

   

  //  2. Handle 401 error
  it('should handle 401 error from getTicketAPI', () => {
    const mockError = { status: 401 };
    mockAuthService.isLoggedIn.and.callFake(() => {true});
    mockTicketsService.getTicketAPI.and.returnValue(throwError(() => mockError));
    spyOn(window, 'alert');

    fixture.detectChanges(); // triggers ngOnInit

    expect(window.alert).toHaveBeenCalledWith('Session expired Login again to continue');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(mockAuthService.isLoggedOut).toHaveBeenCalled();
  });
});
