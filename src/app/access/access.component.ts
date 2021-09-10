import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UtilService } from '../services/util.service';
import { ApiService } from '../services/api.service';
import { Admins } from './admins.model'

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit{

  firstForm: FormGroup;
  hide2 = true;
  name: any;
  email: any;
  password: any;

  displayedColumns: string[] = [

    'Name',
    'Email',
    'options'
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource01 :  MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource01.filter = filterValue.trim().toLowerCase();
  }

  loginres:any ={
    state:'',
    token:'',
  }

  Admins:any ={
    admins:'',
  }

  constructor(
    public firebaseService: FirebaseService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private util: UtilService
  )
    {
      this.initForm();
    }

  ngOnInit(): void {
    this.GetAdmins();
  }

  initForm() {
    this.firstForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  GetAdmins(){
    this.firebaseService.GetAdmins().subscribe(data => {
      this.dataSource01 = new MatTableDataSource(data);
      this.dataSource01.paginator = this.paginator;
    })
  }

  onformSubmit(){
    if(this.name && this.email && this.password !=null){
      this.firebaseService.create_Admin(this.email,this.password).then(data=>{

        console.log(data.user.uid);

        let details ={
          email: this.email,
          password:this.password,
          username:this.name,
          id:data.user.uid
        }
          if(data.user.uid){
            localStorage.setItem('uid',data.user.uid);
            this.firebaseService.createAdmin(details,data.user.uid);
            this.util.showSuccessful();
            this.formReset(this.firstForm);
          }else{
              return 0;
          }

        }).catch(error=>{
          this.util.showError(error.message);
          this.formReset(this.firstForm);
        })
    }else{
      this.util.showError();
    }
  }

  formReset(firstForm: FormGroup) {

    firstForm.reset();
    Object.keys(firstForm.controls).forEach(key => {
      firstForm.get(key).setErrors(null) ;
    });
  }

  deleteAdmin(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.firebaseService.deleteAdmin(id).then((data)=>
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success'));
        console.log('Deleted');

      }
    });

  }


  Cancel(){
    this.formReset(this.firstForm);
  }
}
