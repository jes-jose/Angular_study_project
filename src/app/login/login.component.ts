import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

/*

                    DATA FLOW FROM FRONT -> BACKEND
##################################################################################

#  to get data from html to ts -using modal driven data  binding method
----------------------------------------------------------------------------
#  step-1 -> imoprt ReactiveFormsModule in imports
#  step-2 -> injuct FormBuilder class in LoginComponent
#  step-3 -> declare a variable to store input datas as FormGroup type
#  step-4 -> using group() in the injuced class FormBuilder validate and assigin data to variables -validate using validates class
#  step-5 -> goto component.html file to bind the FormGroup to the desired forms or div's
#  step-6 -> bind each key in loginForm to respected input fields using formControlName attribute if the input fields are in form tag then specifiy name attribute to respected field names else it is in div no problem
#  step-7 -> eighter call the login method using (ngSubmit) by making the button type submit if it is a form tag or else by (click) events
#  step-8 -> the inputed and validated data can be access in loginForm.value
#  step-9 -> check wether the data is valid then based on the result move to api call
#  step-10 -> goto service/api.service.ts (created using ng g s service/api) to create an api to backend

-----------------------------------------------------------------------------------------------------
#  step-16 -> inject ApiService class to access apis
#  step-17 -> use api.loginApi() to do backend connection and the result will return as observable
#  step-18 -> we resolve it as partial observable since it maybe +ve or -ve response
#  step-19 -> resolve using subscribe() -in partial observable it accepts two keys next: -> +ve response error: -> -ve response

----------------------------------------------------------------------------------------------------------------------------


## ngOnInit - to call functions and such tasks when loading a page -same use as useEffect() in reactjs


*/
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router:Router) {
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9#$%]*')]]
    })
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      Swal.fire({
        title: "Oops",
        text: "Please fill the form",
        icon: 'info',
        confirmButtonText: 'ok'
      })
    }
    else {
      this.api.loginApi(this.loginForm.value).subscribe({
        next: (result: any) => {


          
            Swal.fire({
            title: "Oops",
            text: "Login successful",
            icon: 'info',
            confirmButtonText: 'ok'
          })
          sessionStorage.setItem("user",JSON.stringify(result.existingUser))
          sessionStorage.setItem("token",JSON.stringify(result.token))
          this.router.navigateByUrl('/');


        },
        error: (error: any) => {
          if (error.status == 401) {
            Swal.fire({
              title: "Oops",
              text: "User Not Found",
              icon: 'error',
              confirmButtonText: 'ok'
            })
          }
          else if (error.status == 404) {
            Swal.fire({
              title: "Oops",
              text: "Invalid email or password",
              icon: 'error',
              confirmButtonText: 'ok'
            })
          }

        }
      })
    }

  }

}
