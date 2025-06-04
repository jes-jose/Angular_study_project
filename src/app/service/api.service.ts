import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
#creating api to backend
-----------------------------------
# step-11 -> injuct class HttpClient to the ApiService class to use http methods -better than axios
# step-12 -> make sure to include value provideHttpClient() at key providers: in app.config.ts file  
# step-13 -> create a variable for serverurl with type string and store url to the server in the serverurl variable
# step-14 -> create api for various situations
# step-15 -> after api execution result will be avalible at login() as observable

*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   serverurl:string = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

    //api for registration
    registerApi(reqbody:any){
      return this.http.post(`${this.serverurl}/register`,reqbody)
    }

    //api for login
    loginApi(reqbody:any){
      console.log(reqbody);
      
      return this.http.get(`${this.serverurl}/login`,reqbody)
    }
  
}
