import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {UtilService } from '../services/util.service';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Lead } from './lead.model';

Lead

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  isAddNews:boolean = false
  isEdit:boolean = false

  LeadName;
  Status;
  LType;
  contact;
  loanId;
  LoanList;
  loanName;
  LoanName;
  category;
  categoryname;
  amount;
  note;
  name;
  service;
  _id:any;
  One;
  Onedata;
  LeadId;

  displayedColumns: string[] = [


    'client',
    'contact',
    'service',
    'notes',
    'date',
    'status',
    'options'

  ];

  Lead:{
    leads:[],
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource01 :  MatTableDataSource<Lead>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource01.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private util: UtilService,
    private apiService: ApiService,
    public firebaseService: FirebaseService,
    private router : Router) {

    }

  ngOnInit(): void {
    this.isAddNews = false;
    this.getLeads();
    this.getLoanList();
  }


  getLeads(){
    this.apiService.ViewLead().subscribe((data: any) => {
      this.Lead=data;
      this.dataSource01 = new MatTableDataSource<Lead>(this.Lead.leads);
      console.log(data);
       //pass the array you want in the table
      this.dataSource01.paginator = this.paginator;
    })
  }


  getLoanList(){
    this.firebaseService.getLoanList().then((data) =>{
      this.LoanList = data;

    }).catch((error) =>{
      console.log('no data');
    })
  }



  Select(id,name){
    this.category=id;
    this.categoryname = name;

  }

  AddformSubmit(){

    this.util.showloading('Please wait...', 'Data Saving!');
    //let docid = Math.random().toString(36).substring(2)+Date.now();
    //let dateAdded = new Date();
    //let addedDate = this.datePipe.transform(dateAdded, 'medium')

    let details = {
     // LeadName: this.LeadName,
      name: this.LeadName,
      service: this.categoryname,
      contact: this.contact.toString(),
      amount:this.amount.toString(),
      notes:this.note,
      status: this.Status,
      //LeadTypeId: this.category,
      //LeadType :this.categoryname,

      date:  moment(Date.now()).format('l'),
    }

    this.apiService.AddLead(details).subscribe((data)=>{
      this.clear();
      console.log(data);
      this.util.showSuccessful();
      this.Cancel();
    }),(error)=>{
      this.util.showError(error.message);
      console.log(error);

    };
  }

  deleteLead(id){
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
        this.apiService.deleteLead(id).subscribe((data)=>
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')),(error)=>{
          this.util.showError(error);
        };
      }
    });
  }

  getOneItem(id){
    this.util.showloading('Please wait...', 'Data Loading!');
    this.apiService.GetLeadItem(id).subscribe((data: any) => {

      console.log(data.leads);
      this.One = data.leads;
      this.LeadId = this.One[0]._id;
      console.log(this.LeadId);

      this.LeadName = this.One[0].client;
      this.category = this.One[0].service;
      this.contact = this.One[0].contact;
      this.amount = this.One[0].amount;
      this.note = this.One[0].notes;
      this.Status = this.One[0].status;
      this.clickEdit();
      this.util.dismissAlert();
    });
  }

  update(){
    this.util.showloading('Please wait...', 'Data Saving!');
    let upDetail={

      secret:"ADMIN_SECRET",
      id: this.LeadId,
      status: this.Status,
    }

    this.apiService.updateLead(this.LeadId, upDetail).subscribe((data)=>{
        this.util.showEditSuccessful();
        this.Cancel();
        this.getLeads();
    }),(error) =>{
      this.util.showError(error);

    };
  }

  clear(){
    this.LeadName='',
    this.loanName='',
    this.contact='',
    this.Status=''
  }

  clickAdd(){
    this.isAddNews = true;
    this.clear();
  }

  Cancel(){
    this.isAddNews = false;
    this.isEdit=false;
    this.getLeads();
  }

  clickEdit(){
    this.isEdit=true;
    this.isAddNews = true;
  }




}
