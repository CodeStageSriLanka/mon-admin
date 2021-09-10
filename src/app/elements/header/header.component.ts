import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

	toggleChat: boolean = true;
	toggleSingle: boolean = true;
  user;

  accountInfo;
	constructor(
    public firebaseService: FirebaseService,
    private router : Router) { }

	ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Login'));
	}

  logout() {
    this.firebaseService.logout();
    console.log("cleared");
    this.router.navigate(['/page-login']);
  }


	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}


}
