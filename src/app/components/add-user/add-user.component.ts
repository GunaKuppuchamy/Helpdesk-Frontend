import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  userForm!:FormGroup;
  userservice=inject(UserServiceService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      empid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneno: ['', Validators.required],
      bu: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  submitUser()
  {
    const newUser={...this.userForm.value};
    this.userservice.addUser(newUser);
    this.router.navigate(['/adminViewUsers']);
  }

}
