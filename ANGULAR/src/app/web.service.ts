import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WebService {

    pubID;
    numberPubs;
    uri = 'http://localhost:3000/api/pubs';
    

    private pub_private_list = [];
    private pubsSubject = new Subject();
    pub_list = this.pubsSubject.asObservable();

    private singlePub_private_list = [];
    private pubSubject = new Subject();
    singlePub = this.pubSubject.asObservable();

    private reviews_private_list = [];
    private reviewsSubject = new Subject();
    reviews = this.reviewsSubject.asObservable();

    reviewsCount: number;
    length: number;
    private messageSource = new BehaviorSubject<number>(this.length);
    currentMessage = this.messageSource.asObservable();

    constructor(private http: Http) {}

    

    changeMessage(message: number){
        this.messageSource.next(message);
    }

    getPubsLength(){
        return this.http.get(`${this.uri}Length`)
            .subscribe(response => {
                this.numberPubs = response.json();
                console.log(this.numberPubs);
                this.length = this.numberPubs;
                console.log(this.length);
            })
    }

    getPubs() {
        return this.http.get(`${this.uri}`)
            .subscribe(response => {
                this.pub_private_list = response.json();
                if (this.pub_private_list.length == this.pub_private_list.length + 1){
                    this.length = this.pub_private_list.length;
                }
                this.pubsSubject.next(this.pub_private_list);
            })
    }
    
    getPub(id) {
        return this.http.get(`${this.uri}/` + id)
            .subscribe(response => {
                this.singlePub_private_list = [];
                this.singlePub_private_list.push(response.json());
                this.pubSubject.next(this.singlePub_private_list);
                this.pubID = id;
            })
    }

    postPub(pub) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', pub.name);
        urlSearchParams.append('address', pub.address);
        urlSearchParams.append('postcode', pub.postcode);
        urlSearchParams.append('town', pub.town);
        urlSearchParams.append('type', pub.type);
        urlSearchParams.append('latitude', pub.latitude);
        urlSearchParams.append('longitude', pub.longitude);

        this.http.post(`${this.uri}`, urlSearchParams)
                            .subscribe(response => {
                                this.getPubs();
                                this.length++;
                                console.log(this.length);
                            })
    }

    editPub(id){
        return this.http
                    .get(`${this.uri}/${id}`)
                    .map(res => {
                        return res;
                    });
    }

    updatePub(name, address, postcode, town, type, latitude, longitude, id) {
        const obj = {
          name: name,
          address: address,
          postcode: postcode,
          town: town,
          type: type,
          latitude: latitude,
          longitude: longitude
        };
        this
          .http
          .post(`${this.uri}/${id}`, obj)
          .subscribe(res => console.log('Done'));
      }

    deletePub(id){
        return this.http
                    .delete(`${this.uri}/${id}`);   
    }

    deleteReview(id, rID){
        return this.http
                    .delete(`${this.uri}/${id}/reviews/${rID}`);   
    }

    getReviews(id,) {
        return this.http.get(`${this.uri}/` + id + '/reviews')
            .subscribe(response => {
                this.reviews_private_list = response.json();
                this.reviewsSubject.next(this.reviews_private_list);
                this.reviewsCount = this.reviews_private_list.length;
                console.log(this.reviewsCount);
            })
    }

    postReview(review) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', review.name);
        urlSearchParams.append('text', review.review);
        urlSearchParams.append('stars', review.stars);

        this.http.post(`${this.uri}/` + 
                        review.pubID + "/reviews", urlSearchParams)
                            .subscribe(response => {
                                this.getReviews(review.pubID);
                            })
    }
}