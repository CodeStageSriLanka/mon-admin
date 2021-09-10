import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;

  loginres:any ={
    state:'',
    token:''
  }

  constructor( private firebaseService : FirebaseService,
    private apiService: ApiService,
    private router : Router,
    private util: UtilService) {}

  ngOnInit(): void {
  }


  Login(){

    if(this.email && this.password != null){
      if(this.email && this.password){
        this.util.showloading();
        this.firebaseService.login(this.email,this.password).then((res)=>{

          console.log(res.user.uid);
          this.firebaseService.getAdminLogin(res.user.uid).then((data)=>{

            console.log(data);

              localStorage.setItem('isLogin', 'true');
              console.log(res.user.uid);
              localStorage.setItem('uid',data.uid);
              localStorage.setItem('Login', JSON.stringify(data));
              this.router.navigate(['/admin/index']);
              this.util.dismissAlert();


          }).catch(error=>{
            this.util.showError(error.message);
            })
        }).catch(error=>{
          this.util.showErrorAdmin('Invalid Login!');
          this.clear();
        })
      }
    }else{
      this.util.showError();
    }

    //const user ={
    //  email: this.email,
  //    password: this.password,
   // };
  //  if(this.email && this.password != null){
   //   this.util.showloading();
   //   this.apiService.LoginUser(user).subscribe(data =>{
   //       this.loginres = data;
   //       console.log( this.loginres);
   //     if(this.loginres.token){
   //       localStorage.setItem('token', this.loginres.token);
   //       localStorage.setItem('Login', JSON.stringify(data));
   //       this.router.navigateByUrl('/admin/index');
   //       this.util.dismissAlert();
   //     }else{
    //      this.util.dismissAlert();
   //       this.util.showError();
  //      }
   //   })
  //  }else{
  //    this.util.showError();
  //  }
  }


  clear(){

    this.email='',
    this.password=''

  }


  }


