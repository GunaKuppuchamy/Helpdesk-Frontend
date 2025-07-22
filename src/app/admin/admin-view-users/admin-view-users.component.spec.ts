import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminViewUsersComponent } from './admin-view-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserServiceService } from '../../services/user-service.service';
import { AuthService } from '../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Users } from '../../models/users';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('AdminViewUsersComponent', () => {
  let component: AdminViewUsersComponent;
  let fixture: ComponentFixture<AdminViewUsersComponent>;
  let mockUserService: jasmine.SpyObj<UserServiceService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockUsers: Users[] = [
    {
      empid: 'E001',
      name: 'Alice',
      email: 'alice@example.com',
      phoneno: 9876543210,
      password: 'pass123',
      role: 'admin',
      bu: 'DEX'
    },
    {
      empid: 'E002',
      name: 'Bob',
      email: 'bob@example.com',
      phoneno: 9876543211,
      password: 'bobpass',
      role: 'user',
      bu: 'HR'
    }
  ];

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserServiceService', ['getUsersApi', 'deleteUserById']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['sessionTimeout']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AdminViewUsersComponent, HttpClientTestingModule],
      providers: [
        { provide: UserServiceService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminViewUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    const httpResponse = new HttpResponse<Users[]>({
      body: mockUsers,
      status: 200,
      statusText: 'OK',
      url: '/api/users'
    });

    mockUserService.getUsersApi.and.returnValue(of(httpResponse));

    component.ngOnInit();
    expect(component.allUsers).toEqual(mockUsers);
    expect(mockUserService.getUsersApi).toHaveBeenCalled();
  });

  it('should call sessionTimeout on fetch error', () => {
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      error: 'Unauthorized',
      url: '/api/users'
    });

    mockUserService.getUsersApi.and.returnValue(throwError(() => errorResponse));
    mockAuthService.sessionTimeout.and.returnValue(true);

    component.ngOnInit();

    expect(mockUserService.getUsersApi).toHaveBeenCalled();
    expect(mockAuthService.sessionTimeout).toHaveBeenCalledWith(errorResponse);
  });

  it('should navigate to addUser route on editUser()', () => {
    component.editUser('E001');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/addUser', 'E001']);
  });

  it('should call deleteUserById and refresh user list', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteResponse = new HttpResponse<Object>({
      body: {},
      status: 200,
      statusText: 'OK',
      url: '/api/users/E001'
    });

    mockUserService.deleteUserById.and.returnValue(of(deleteResponse));
    spyOn(component, 'ngOnInit');

    component.deleteUser('E001');
    tick();

    expect(mockUserService.deleteUserById).toHaveBeenCalledWith('E001');
    expect(component.ngOnInit).toHaveBeenCalled();
  }));

  it('should handle error during delete and call sessionTimeout', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      error: 'Something went wrong',
      url: '/api/users/E001'
    });

    mockUserService.deleteUserById.and.returnValue(throwError(() => error));
    mockAuthService.sessionTimeout.and.returnValue(false);

    component.deleteUser('E001');
    tick();

    expect(mockAuthService.sessionTimeout).toHaveBeenCalledWith(error);
  }));

  it('should not delete user if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteUser('E001');
    expect(mockUserService.deleteUserById).not.toHaveBeenCalled();
  });
});
