import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {UtilService } from '../services/util.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  id;
  username;
  angForm: FormGroup;
  angForm2: FormGroup;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    public firebaseService: FirebaseService) {
    this.createForm();
  }

  ngOnInit() {


  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', [Validators.required ]],
		  image: ['', [Validators.required] ],

    });
  }






}
