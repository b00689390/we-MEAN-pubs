import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'singlePub',
  templateUrl: './singlePub.component.html',
  styleUrls: ['./singlePub.component.css']
})
export class SinglePubComponent {

  reviewForm;
  numberOfLikes: number = 0;
  profile: any;

  review = {
    pubID: '',
    name: this.authService.userProfile.name,
    review: '',
    stars: 5
  }

  constructor(private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService) {

    this.reviewForm = formBuilder.group({
      name: ['', Validators.required],
      review: ['', Validators.required],
      stars: 5
    });
  }

  ngOnInit() {
    if (sessionStorage.numberOfLikes) {
      this.numberOfLikes = sessionStorage.numberOfLikes;
    }
    this.webService.getPub(this.route.snapshot.params.id);
    this.webService.getReviews(this.route.snapshot.params.id);
  }

  onSubmit() {
    this.review.pubID = this.webService.pubID;
    this.webService.postReview(this.review);
    this.reviewForm.reset();
  }

  isInvalid(control) {
    return (this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched)
  }

  isIncomplete() {
    return this.isInvalid('name') || this.isInvalid('review');
  }

  like() {
    this.numberOfLikes++;
    sessionStorage.numberOfLikes = Number(this.numberOfLikes);
  }

  dislike() {
    if (this.numberOfLikes > 0) {
      this.numberOfLikes--;
      sessionStorage.numberOfLikes = Number(this.numberOfLikes);
    }
  }

  deleteReview(id, rID) {
    this.webService.deleteReview(id, rID)
      .subscribe(res => {
        console.log('Deleted');
        this.webService.getPub(id);
        this.webService.getReviews(id);
      });
  }


  pub;
}
