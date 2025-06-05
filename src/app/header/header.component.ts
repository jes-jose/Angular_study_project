import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLogin:boolean = false;
  loginUser:string = "";

  ngOnInit(){
    if(sessionStorage.getItem("token")){
      this.isLogin = true;
      this.loginUser = JSON.parse(sessionStorage.getItem("existingUser") || "").username;
    }
  }
}
