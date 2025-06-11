
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  userForm!: FormGroup;
  isEditMode: boolean = false;
  editUserId: string | null = null;
  curUserData!: Users;

  private userservice = inject(UserServiceService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  ngOnInit() {
    this.authService.isLoggedIn();
    this.userForm = this.fb.group({
      empid: ['', [Validators.required, Validators.pattern(/^[A-Z]\d{3}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phoneno: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      bu: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.editUserId = this.route.snapshot.paramMap.get('id');

    if (this.editUserId) {
      this.isEditMode = true;

    this.userservice.getUserById(this.editUserId).subscribe({
      next: (response) => {
        console.log(response)
        this.curUserData = response.body;
        if (this.curUserData) {
          console.log("Patching Values");
          this.userForm.patchValue(this.curUserData);
        } else {
          console.log("User data is null");
        }
        console.log(this.curUserData);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/']); // Session expired
        } else {
          console.error('Failed to load user data:', err);
          alert('Something went wrong while loading user data.');
        }
      }
    });
  }
}

  submitUser() {
    const newUser = { ...this.userForm.value };
    console.log(newUser);

  if (this.isEditMode && this.editUserId !== null) {
    // Edit mode: update existing user
    this.userservice.UpdateUser(this.editUserId, newUser).subscribe({
      next: (response) => {
        console.log(response)
        console.log('User edited successfully!');
        this.router.navigate(['/adminViewUsers']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/']); // Redirect to login
        } else {
          console.error('Error occurred while editing user', err);
          alert('Something went wrong while editing the user.');
        }
      }
    });
  } else {
    // Add mode: add new user
    this.userservice.addUser(newUser).subscribe({
      next: (response) => {
        console.log(response)
        console.log('User added successfully!', response);
        this.router.navigate(['/adminViewUsers']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/']); 
          this.authService.isLoggedOut();
// Redirect to login
        } else {
          console.error('Error adding user', err);
          alert('Something went wrong while adding the user.');
        }
      }
    });
  }
}
}

