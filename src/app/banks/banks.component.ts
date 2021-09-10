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

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  isAddNews:boolean = false
  isEdit:boolean = false

  catList;
  title;
  loan;
  docid;
  loanId;
  loanName;
  loanname;
  interest;

  displayedColumns: string[] = [

    'Title',
    'AddedDate',
    'options'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource01 :  MatTableDataSource<any>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource01.filter = filterValue.trim().toLowerCase();
  }

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private util: UtilService,
    public firebaseService: FirebaseService,
    private router : Router) {


  }

  ngOnInit(){
    this.firebaseService.GetBank().subscribe(data => {
      this.dataSource01 = new MatTableDataSource(data);
      this.dataSource01.paginator = this.paginator;
    });
    this.isAddNews = false;
  }



  AddNewsformSubmit(){
    if(this.title != null){
    this.util.showloading('Please wait...', 'Data Saving!');
    let docid = Math.random().toString(36).substring(2)+Date.now();
    let dateAdded = new Date();
    let addedDate = this.datePipe.transform(dateAdded, 'medium')

    let details = {
      title: this.title,
      docid: docid,
      addedDate:  moment(Date.now()).format('l'),
    }

    this.firebaseService.AddBank(details, docid).then((data)=>{
      this.clear();
      this.util.showSuccessful();
      this.Cancel();
    }).catch((error)=>{
      console.log(error)
      this.util.showError();
    });

    }else{
      this.util.showError();
    }
  }

  getOneItem(docid){

    this.util.showloading();
    this.firebaseService.getoneitem(docid).then((data) =>{

      this.docid = data.docid;
      console.log(this.docid);
      this.title = data.title;
      this.clickEdit();
      this.util.dismissAlert();

    }).catch((error)=>{
      this.util.showError(error.message);
    })
  }

  update(){
    let upDetail={
      title : this.title,

    }
    this.firebaseService.updateBank(upDetail, this.docid).then((data)=>{
        console.log('Updated');
        this.util.showEditSuccessful();
        this.Cancel();
    }).catch((error)=>{
      this.util.showError(error.message);

    })
  }


  deleteNews(id) {
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
        this.firebaseService.deleteBank(id).then((data)=>
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success'));

      }
    });
  }



  clickAdd(){
    this.isAddNews = true;
  }

  Cancel(){
    this.isAddNews = false;
    this.isEdit=false;
    this.clear();
  }

  clickEdit(){
    this.isEdit=true;
    this.isAddNews = true;
  }


  clear(){
    this.title='',
    this.loanId='',
    this.interest=''
  }

}
