
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
      //this.curUserData=this.userservice.getUserById(this.editUserId);
      this.userservice.getUserById(this.editUserId).subscribe({
        next : (user)=>
      {
        this.curUserData = user;
        //console.log(this.curUserData)
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
    console.log(newUser);
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
