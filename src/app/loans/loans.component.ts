import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {UtilService } from '../services/util.service';
import { FirebaseService } from '../services/firebase.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Loans } from './loans.model'

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  isAddCat:boolean = false
  isEdit:boolean = false


   docid;
   name;
   RandomId;
   cal;
   Duration;

   displayedColumns: string[] = [

    'Title',
    'cal',
    'Duration',
    'options'
  ];

  angForm: FormGroup;
  angForm2: FormGroup;

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

  Loans: any={
    loans:'',
  }


   constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private apiService: ApiService,
    private util: UtilService,
    public firebaseService: FirebaseService) {

  }

  ngOnInit(){
    this.GetLoans();
    this.isAddCat = false;
  }


  GetLoans(){
    this.firebaseService.GetLoanCategory().subscribe(data => {
      this.dataSource01 = new MatTableDataSource(data);
      this.dataSource01.paginator = this.paginator;
    });
  }

  onSubmit(){

    if(this.name != null){
      this.util.showloading('Please wait...', 'Data Saving!');
      this.RandomId =(Math.random()*1e32).toString(36)+ Date.now();
      let dateAdded = new Date();

    let details = {
      docid:this.RandomId,
      name: this.name,
      calMethod: this.cal,
      Duration:this.Duration,
      loanId: Date.now(),
      addedDate:  moment(Date.now()).format('l'),
    }

    this.firebaseService.AddLoanCategory(details, this.RandomId).then((data)=>{
        this.util.showSuccessful();
        this.Cancel();
      }).catch((error)=>{
        this.util.showError(error.message);
       this.Cancel();
      })
    }else{

;      this.util.showError();
    };
  }


  getOneItem(docid){

    this.util.showloading('Please wait...', 'Data Loading!');
    this.firebaseService.getLoanoneitem(docid).then((data) =>{

      this.docid = data.docid;
      this.name = data.name;
      this.Duration = data.Duration;
      this.cal = data.calMethod;
      this.clickEdit();
      this.util.dismissAlert();

    }).catch((error)=>{
      this.util.showError(error.message);
    })
  }


  update(){
    this.util.showloading('Please wait...', 'Data Saving!');
    let upDetail={
      name : this.name,
      calMethod: this.cal,
      Duration:this.Duration
    }

    this.firebaseService.updateLoan(upDetail, this.docid).then((data)=>{
        this.util.showEditSuccessful();
        this.Cancel();
    }).catch((error)=>{
      this.util.showError(error.message);

    })
  }

  deleteLoan(id) {
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
        this.util.showloading('Please wait...', 'Deleting!');
        this.firebaseService.deleteLoan(id).then((data)=>
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success'));
      }
    });

  }




  clickAdd(){
    this.isAddCat = true;
  }

  Cancel(){
    this.isAddCat = false;
    this.isEdit=false;
    this.clear();
  }

  clickEdit(){
    this.isEdit=true;
    this.isAddCat = true;
  }


  clear(){
    this.name=''
    this.Duration =''
    this.cal =''

  }

}


