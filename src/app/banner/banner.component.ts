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
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  displayedColumns: string[] = [

    'Image',
    'options'
  ];

  isAddNews:boolean = false
  isEdit:boolean = false
  image;
  docid;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource01 :  MatTableDataSource<any>;


  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private util: UtilService,
    public firebaseService: FirebaseService,
    private router : Router) {

    }

  ngOnInit(){
    this.firebaseService.GetBanners().subscribe(data => {
      this.dataSource01 = new MatTableDataSource(data);
      this.dataSource01.paginator = this.paginator;
    });
    this.isAddNews = false;
  }

  AddformSubmit(){
    if( this.image != null){
    let docid = Math.random().toString(36).substring(2)+Date.now();
    let dateAdded = new Date();
    let addedDate = this.datePipe.transform(dateAdded, 'medium')

    let details = {
      image:this.image,
      docid: docid,
      addedDate:  moment(Date.now()).format('l'),
    }

    this.firebaseService.AddBanner(details, docid).then((data)=>{
      console.log('success');
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


  upload(event){
    this.util.showloading('Uploading');
    const file = event.target.files[0];
    this.firebaseService.uploadFile('LoanCal/banners',file).then(data=>{
      console.log(data)
      this.image = data;
      this.util.dismissAlert();
    }).catch(error=>{
      console.log(error)
    })
  }


  getOneItem(docid){

    this.clickEdit();
    this.firebaseService.getBanneritem(docid).then((data) =>{
      console.log(data);

      this.docid = data.docid;
      console.log(this.docid);

      this.image = data.image;

    }).catch((error)=>{
      console.log("error");
    })
  }


  update(){
    let upDetail={
      image : this.image

    }
    this.firebaseService.updateBanner(upDetail, this.docid).then((data)=>{
        console.log('Updated');
        this.util.showEditSuccessful();
        this.Cancel();

    }).catch((error)=>{
      console.log(error);

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
        this.firebaseService.deleteBanner(id).then((data)=>
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success'));
        console.log('Deleted');
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
    this.image=''
  }











}
