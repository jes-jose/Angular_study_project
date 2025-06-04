import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup 
  //private formbuilder:FormBuilder - injucting FormBuilder class to constructor to be used in this class - to get data from input fields -model driven data binding 

  //private api:ApiService - injucting ApiService service to use api services - data transfer between different components
  constructor(private formbuilder:FormBuilder , private api:ApiService){

    this.registerForm = formbuilder.group({
      username:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9#$%]*')]]
    })
    
  }

  register(){

    if(this.registerForm.invalid){
      alert("Invalid data");
    }
    else{
      //using registerApi injucted in this class to make api functions - returns observable -use partial observable -contains object with keys as next:+ve response error:-ve response 
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(result:any)=>{
          console.log(result);
          
        },
        error:(error:any)=>{
          console.log(error);
          
        }
      })
    }
  }

}
