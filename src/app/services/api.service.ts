import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

const baseUrl = 'https://leadmanagementproject.herokuapp.com/admin/lead?id';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  //public LoginUser(details){
  //  return this.http.post('https://leadmanagementproject.herokuapp.com/admin/login',details);
 // }

  public AddLead(details){
    return this.http.post('https://leadmanagementproject.herokuapp.com/client/requirement',details);
  }

  public ViewLead(){
    return this.http.get('https://leadmanagementproject.herokuapp.com/admin/lead');
  }

  public GetLeadItem(id){
    return this.http.get('https://leadmanagementproject.herokuapp.com/admin/lead?id='+id)
  }

  public updateLead(id, upDetail){
    return this.http.patch(`${baseUrl}=${id}`, upDetail);
  }

  public deleteLead(id){
    return this.http.delete('https://leadmanagementproject.herokuapp.com/admin/lead?id='+id)
  }

 // public DeleteAdmin(token,details:any){

  //  let options = {
  //    headers: new HttpHeaders({
  //      'Content-Type': 'application/json',
  //      'Authorization': `Bearer ${token}`
  //    }),
   //   body: details,
  //  };
   // return this.http.delete('https://leadmanagementproject.herokuapp.com/admin/' ,options);
  //}




  //Loans

 // public AddLoan(token,details){
 //   let options = {
 //     headers: new HttpHeaders({
 //       'Content-Type': 'application/json',
  //      'Authorization': `Bearer ${token}`
  //    }),
  //    body: details,
  //  };
  //  return this.http.post('https://leadmanagementproject.herokuapp.com/service/',options);
 // }

 // public ViewLoan(token){
 //   const headers = new HttpHeaders({
 //     'Content-Type': 'application/json',
 //     'Authorization': `Bearer ${token}`
 //   })
 //   return this.http.get('https://leadmanagementproject.herokuapp.com/service',{ headers: headers });
 // }




  //BankLoans

 // public ViewBankLoans(token){
  //  const headers = new HttpHeaders({
 //     'Content-Type': 'application/json',
  ////    'Authorization': `Bearer ${token}`
  //  })
  //  return this.http.get('https://leadmanagementproject.herokuapp.com/institute',{ headers: headers });
  //}






}
