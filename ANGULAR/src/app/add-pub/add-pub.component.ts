import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { WebService } from '../web.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-pub',
  templateUrl: './add-pub.component.html',
  styleUrls: ['./add-pub.component.css']
})
export class AddPubComponent implements OnInit {

  pubForm;

  pub = {
    name: '',
    address: '',
    postcode: '',
    town: '',
    type: '',
    latitude: null,
    longitude: null
  }

  constructor(private webService: WebService, 
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { 

                this.pubForm = formBuilder.group( {
                  name: ['', Validators.required],
                  address: ['', Validators.required],
                  postcode: ['', Validators.required],
                  town: ['', Validators.required],
                  type: ['', Validators.required],
                  latitude: null,
                  longitude: null
                });
              }

  ngOnInit() {
  }

  onSubmit() {
    this.webService.postPub(this.pub);
    this.pubForm.reset();
    this.router.navigate(['/pub']);
    this.webService.getPubs();
  }

  isInvalid(control) {
    return (this.pubForm.controls[control].invalid &&
           this.pubForm.controls[control].touched)
  }

  isIncomplete() {
    return this.isInvalid('name') || this.isInvalid('pub');
  }


}
