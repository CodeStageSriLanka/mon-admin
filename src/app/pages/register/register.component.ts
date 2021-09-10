import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {UtilService } from '../../services/util.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username;
  email;
  password;

  constructor(
    public firebaseService: FirebaseService,
    public util: UtilService,
    private router : Router) { }

  ngOnInit(): void {
  }

  onformSubmit() {
    this.firebaseService.create_Admin(this.email,this.password).then(data=>{
      console.log(data.user.uid);

      let details ={
        email: this.email,
        password:this.password,
        username: this.username,
        id:data.user.uid
      }
        if(data.user.uid){
          localStorage.setItem('uid',data.user.uid);
          this.firebaseService.createAdmin(details,data.user.uid);
          this.clear();
          this.util.showSuccessfulAdmin();
          this.router.navigate(['/page-login']);
          console.log("successful");
        }else{
            return 0;
        }

      }).catch(error=>{
        this.util.showError();
      })
  }

  clear(){

    this.email='',
    this.password=''

  }

}
