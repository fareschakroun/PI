import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicebackService } from '../services/serviceback.service';
import { JwtClientService } from '../services/jwt-client.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  authForm!: FormGroup;
  userID !: number ;
  user!:User;
  request ={
    email: "",
    password: ""
  }
  constructor(private formBuilder: FormBuilder,private serviceToken : JwtClientService,private serviceback: ServicebackService,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });


   
  }

  login() {
    if (this.authForm.valid) {
      // Perform login operation, e.g., send data to server
      this.request.email=this.authForm.get('email').value
      this.request.password=this.authForm.get('password').value
      this.serviceToken.generateToken(this.request).subscribe(data =>
        {
          console.log(data);
          this.serviceToken.setToken(data);

          this.serviceback.getUserId(this.request.email).subscribe( (data:number) => {
                this.userID= data ;
                console.log("user id ")
                console.log(data);

                this.userService.getUser(this.userID.toString()).subscribe(res=>{
                  //this.nbrCandidature.push(res);
                  this.user=res;
                  localStorage.setItem("user",JSON.stringify(res));
                })
                localStorage.setItem("userID",this.userID.toString())

                this.userService.getUser(this.userID.toString()).subscribe(res=>{
                  //this.nbrCandidature.push(res);
                  this.user=res;
                  localStorage.setItem("user",JSON.stringify(res));
                })
                  this.router.navigate(['/viewPack'])
          })
        }
        ,(err) => {
          console.log("error getting user or bad credential")
        }
        
        );
      console.log(this.authForm.value);
    } else {
      // Handle invalid form
      console.log("Invalid form");
    }
  }

}
