import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  TotalBank: any='';
  TotalLoans:any=0;
  TotalLead: any=0;
  TotalLeads:any=0;
  TLoans;

  constructor(
    public firebaseService: FirebaseService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.GetTotalBanks();
    this.GetTotalLons();
    this.GetLeads();
  }

  GetTotalBanks(){
    this.firebaseService.GetBank().subscribe(data => {
      this.TotalBank = data;
    });
  }

  GetTotalLons(){
    this.firebaseService.GetLoanCategory().subscribe(data => {
      this.TotalLoans = data;
    });
  }

  GetLeads(){
    this.apiService.ViewLead().subscribe((data: any) => {
      this.TotalLead=data;
      this.TotalLeads = this.TotalLead.leads;
    });
  }
}
