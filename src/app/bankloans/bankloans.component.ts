import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewChildren,QueryList,ElementRef} from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatInput} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {UtilService } from '../services/util.service';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BankLoans } from './BankLoans.model'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-bankloans',
  templateUrl: './bankloans.component.html',
  styleUrls: ['./bankloans.component.css']
})
export class BankloansComponent implements OnInit {

  isAddNews:boolean = false
  isEdit:boolean = false

  catList;
  bankList;
  loanId;
  loanName;
  BankName;
  LoanList;
  LoanName;
  LoanDetails;
  NewBank;
  bankId;
  title;
  Banks: any[]=[];

  displayedColumns: string[] = [

    'Title',
    'Loans',
    'options'
  ];

  displayedColumns2: string[] = [

    'Loan',
    'Interest',
    'options'
  ];



  editRowId:number=-1
  @ViewChildren(MatInput,{read:ElementRef}) inputs:QueryList<ElementRef>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource01 :  MatTableDataSource<any>;
  dataSource02 :  MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource02.filter = filterValue.trim().toLowerCase();
  }

  loginres:any ={
    state:'',
    token:'',
  }

  BankLoans: any={
    bankloans:'',
  }

  editCache: { [key: string]: any } = {};

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private util: UtilService,
    private apiService: ApiService,
    public firebaseService: FirebaseService,
    private router : Router) {

      var result = document.getElementsByClassName("interest");

  }


  edit(row,element)
  {
    this.editRowId=row;
    setTimeout(()=>{
      this.inputs.find(x=>x.nativeElement.getAttribute('title')==element).nativeElement.focus()

    })
  }


  ngOnInit(){
    this.isAddNews = false;
    this.getLoanList();
    this.getbankloans();
    this.getBanksDrop();
    this.getBankList();
  }


  getbankloans(){
    this.firebaseService.GetBankLoans().subscribe(data => {
      this.LoanDetails = data;
      console.log(data);

    });
  }

  getBankList(){
    this.firebaseService.GetBank().subscribe(data => {
      this.fixingArray(data);

    });

  }


  fixingArray(data){
    data.forEach(element => {
      let item ={
        bankName: element.title,
        interest: 0,
        bankId: element.docid,
      }
      this.Banks.push(item);
    });
  }


  getLoanList(){
    this.firebaseService.getLoanList().then((data) =>{
      this.LoanList = data;
    }).catch((error) =>{
      console.log('no data');
    })
  }

  Select(id,name){
    this.loanId=id;
    this.loanName = name;
  }

  getBanksDrop(){
    this.firebaseService.getBankList().then((data) =>{
      this.bankList = data;
      console.log(data);

    }).catch((error) =>{
      console.log('no data');
    })
  }

  Selectbank(id,title){
    this.bankId = id;
    this.NewBank = title;
  }

  addBank(){

    let item ={
      bankName: this.NewBank,
      interest: 0,
      bankId: this.bankId,
    }

    this.Banks.push(item);

  }



  Save(id){
    if(this.loanId != null ){
      this.util.showloading('Please wait...', 'Data Saving!');
    let details = {
      LoanId: this.loanId,
      LoanName: this.loanName,
      Interests: this.Banks
    }
    this.firebaseService.AddBankLoans(details, this.loanId).then((data)=>{
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

  getoneitem(id){
    this.util.showloading('Please wait...', 'Data Loading!');
    this.firebaseService.getBankLoanoneitem(id).then((data) =>{
    console.log(data);

      this.LoanName = data.LoanId;
      this.Banks = data.Interests;
      this.clickEdit();
      this.util.dismissAlert();

    }).catch((error)=>{
      this.util.showError(error.message);
    })

  }

  update(){
    this.util.showloading('Please wait...', 'Data Saving!');

    let upDetail={
      Interests: this.Banks
    }

    this.firebaseService.updateBankLoan(upDetail, this.LoanName).then((data)=>{
      console.log('success update');
      this.clear();
      this.util.showSuccessful();
      this.Cancel();
    }).catch((error)=>{
      console.log(error);
      this.util.showError();

    })
  }

  deleteBankLoan(id) {
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
        this.firebaseService.deleteBankLoan(id).then((data)=>
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
    this.LoanName=''

  }


}
