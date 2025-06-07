// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { UserServiceService } from '../../services/user-service.service';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-add-user',
//   imports: [ReactiveFormsModule,RouterLink],
//   templateUrl: './add-user.component.html',
//   styleUrl: './add-user.component.css'
// })
// export class AddUserComponent {

//   userForm!:FormGroup;
//   userservice=inject(UserServiceService);

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.userForm = this.fb.group({
//       empid: ['', Validators.required],
//       name: ['', Validators.required],
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//       phoneno: ['', Validators.required],
//       bu: ['', Validators.required],
//       role: ['', Validators.required]
//     });
//   }

//   submitUser()
//   {
//     const newUser={...this.userForm.value};
//     this.userservice.addUser(newUser);
//     this.router.navigate(['/adminViewUsers']);
//   }

// }

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Users } from '../../models/users';
 
@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
 
  userForm!:FormGroup;
  isEditMode:boolean=false;
  editUserId:string|null=null;
  curUserData!:Users;
 
  private userservice=inject(UserServiceService);
  private route=inject(ActivatedRoute);
  private fb=inject(FormBuilder);
  private router=inject(Router);
 
  ngOnInit()
  {
    this.userForm = this.fb.group({
      empid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneno: ['', Validators.required],
      bu: ['', Validators.required],
      role: ['', Validators.required]
    });
 
    this.editUserId=this.route.snapshot.paramMap.get('id');
    if(this.editUserId)
    {
      this.isEditMode=true;
      this.curUserData=this.userservice.getUserById(this.editUserId);
      if(this.curUserData)
      {
        this.userForm.patchValue(this.curUserData);
      }
    }
  }
 
  submitUser()
  {
    const newUser={...this.userForm.value};
    if(this.isEditMode && this.editUserId!==null)
    {
      this.userservice.updateUserById(this.editUserId, newUser);
    }
    else
    {
      this.userservice.addUser(newUser);
    }
    this.router.navigate(['/adminViewUsers']);
  }
}