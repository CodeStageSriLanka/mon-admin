import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firebase: AngularFirestore,
    private auth : AngularFireAuth,
    private db: AngularFireDatabase,
    private store : AngularFireStorage,
    private router : Router) { }



  // Admin

  create_Admin(email,password){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  createAdmin(details,id){
    return this.firebase.collection('Admin').doc(id).set(details);
  }

  getAdminLogin(id){
    return new Promise<any>((resolve,reject)=>{
      this.firebase.collection('Admin').doc(id).get().subscribe((data)=>{
        resolve(data.data())
      },error=>{
        reject(error)
      })
    })
  }

  GetAdmins() {
    return this.firebase.collection('Admin').valueChanges();
  }

  deleteAdmin(id) {
    return this.firebase.collection('Admin').doc(id).delete();
  }

  login(username, password){
    return this.auth.signInWithEmailAndPassword(username, password);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('uid');
  }















  //Bank

    AddBank(details, id){
      return this.firebase.collection('Banks').doc(id).set(details);
    }


    GetBank() {
      return this.firebase.collection('Banks', ref=> ref.orderBy('addedDate','desc')).valueChanges();
    }

    getoneitem(docid){
      return new Promise<any>((resolve,reject)=>{
        this.firebase.collection('Banks').doc(docid).get().subscribe((data)=>{
          resolve(data.data())
        },error=>{
          reject(error)
        })
      })
    }

    getBankList(){
      return new Promise<any>((resolve,reject) =>{
        this.firebase.collection('Banks').get().subscribe((data) => {
          let bank =  data.docs.map(element=>{
            let Banknames = element.data();
            return Banknames
          });
          resolve(bank)
        }, error=>{
          reject(error)
        })
      })
    }

    updateBank(upDetails, id){
      return this.firebase.collection('Banks').doc(id).update(upDetails);
    }

    deleteBank(id) {
      return this.firebase.collection('Banks').doc(id).delete();
    }





    AddBankLoans(details, id){
      return this.firebase.collection('BankLoans').doc(id).set(details);
    }








    //Loan Category

    AddLoanCategory(details, id){
      return this.firebase.collection('Loans').doc(id).set(details);
    }

    GetLoanCategory() {
      return this.firebase.collection('Loans').valueChanges();
    }

    getLoanList(){
      return new Promise<any>((resolve,reject) =>{
        this.firebase.collection('Loans').get().subscribe((data) => {
          let cat =  data.docs.map(element=>{
            let catnames = element.data();
            return catnames
          });
          resolve(cat)
        }, error=>{
          reject(error)
        })
      })
    }

    getLoanoneitem(docid){
      return new Promise<any>((resolve,reject)=>{
        this.firebase.collection('Loans').doc(docid).get().subscribe((data)=>{
          resolve(data.data())
        },error=>{
          reject(error)
        })
      })
    }

    updateLoan(upDetails, id){
      return this.firebase.collection('Loans').doc(id).update(upDetails);
    }

    deleteLoan(id) {
      return this.firebase.collection('Loans').doc(id).delete();
    }






    //Lead

    AddLead(details, id){
      return this.firebase.collection('Leads').doc(id).set(details);
    }

    GetLeads() {
      return this.firebase.collection('Leads').valueChanges();
    }

    deleteLead(id) {
      return this.firebase.collection('Leads').doc(id).delete();
    }







    //Admin Profile

    getAdminUsername(id){
      return new Promise<any>((resolve,reject)=>{
        this.firebase.collection('Admin').doc(id).get().subscribe((data)=>{
          resolve(data.data())
        },error=>{
          reject(error)
        })
      })
    }











    //BankLoan

    AddBankLoan(details,id){
      return this.firebase.collection('BankLoans').doc(id).set(details);
    }

    GetBankLoans() {
      return this.firebase.collection('BankLoans').valueChanges();
    }

    getBankLoanoneitem(id){
      return new Promise<any>((resolve,reject)=>{
        this.firebase.collection('BankLoans').doc(id).get().subscribe((data)=>{
          resolve(data.data())
        },error=>{
          reject(error)
        })
      })
    }

    updateBankLoan(upDetails, id){
      return this.firebase.collection('BankLoans').doc(id).update(upDetails);
    }

    deleteBankLoan(id) {
      return this.firebase.collection('BankLoans').doc(id).delete();
    }














    //Banners

    AddBanner(details, id){
      return this.firebase.collection('Banners').doc(id).set(details);
    }

    GetBanners() {
      return this.firebase.collection('Banners').valueChanges();
    }

    getBanneritem(docid){
      return new Promise<any>((resolve,reject)=>{
        this.firebase.collection('Banners').doc(docid).get().subscribe((data)=>{
          resolve(data.data())
        },error=>{
          reject(error)
        })
      })
    }

    task : AngularFireUploadTask

    async uploadFile(folder, file){

      if(file){
        const filepath = `${folder}/${file.name}` + Date.now();
        this.task = this.store.upload(filepath, file);

        return (await this.task).ref.getDownloadURL();

      }else{
        return 0;
      }

    }

    updateBanner(upDetails, id){
      return this.firebase.collection('Banners').doc(id).update(upDetails);
    }

    deleteBanner(id) {
      return this.firebase.collection('Banners').doc(id).delete();
    }



}
