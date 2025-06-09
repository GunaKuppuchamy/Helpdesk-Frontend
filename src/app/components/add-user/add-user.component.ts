
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,RouterLink, CommonModule],
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
      empid: ['', [Validators.required,Validators.pattern(/^[A-Z]\d{3}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      phoneno: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      bu: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.editUserId=this.route.snapshot.paramMap.get('id');
    if(this.editUserId)
    {
      this.isEditMode=true;
      //this.curUserData=this.userservice.getUserById(this.editUserId);
      this.userservice.getUserById(this.editUserId).subscribe({
        next : (user)=>
      {
        this.curUserData = user;
        if(this.curUserData)
      {
        console.log("Patching Values")
        this.userForm.patchValue(this.curUserData);
      }
      else{
        console.log("Not Patching")
      }
      console.log(this.curUserData)
      }})
      
    }
  }
 
  submitUser()
  {
    const newUser={...this.userForm.value};
    if(this.isEditMode && this.editUserId!==null) 
    {
      //this.userservice.updateUserById(this.editUserId, newUser);
      this.userservice.UpdateUser(this.editUserId,newUser).subscribe(
        {
          next : (user) =>
          {
            console.log('User Edited Successfully');
            this.router.navigate(['/adminViewUsers']);
          },

          error : () =>
          {
            console.log("Error occured while editing");
          }
        }
      )
    }
    else
    {
      //this.userservice.addUser(newUser);
      this.userservice.addUser(newUser).subscribe(
        {
           next: (user) => {
        console.log('User added successfully!', user);
        this.router.navigate(['/adminViewUsers']);
      },
      error: (err) => {
        console.error('Error adding User', err);
        alert('Something went wrong while adding the User.');
      }

        }
      )
    }
    
  }
}
