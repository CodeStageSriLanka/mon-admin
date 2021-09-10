import { Component } from '@angular/core';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uena';
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;
  
    constructor(public sharedService: SharedService) {     
	}
}
