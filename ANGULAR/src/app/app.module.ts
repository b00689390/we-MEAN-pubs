import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppComponent } from './app.component';
import { PubComponent } from './pub.component';
import { WebService } from './web.service';
import { HomeComponent } from './home.component';
import { SinglePubComponent } from './singlePub.component';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';
import { NavComponent } from './nav.component';
import { FilterPipe } from './filter.pipe';
import { AddPubComponent } from './add-pub/add-pub.component';
import { ProfileComponent } from './profile/profile.component';
import { TypePipe } from './type.pipe';


var routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'We Mean Pubs' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'We Mean Pubs' }
  },
  {
    path: 'pubs',
    component: PubComponent,
    data: { title: 'We Mean Pubs - Venues' }
  },
  {
    path: 'singlePub/:id',
    component: SinglePubComponent,
    data: { title: 'We Mean Pubs - Venue' }
  },
  {
    path: 'callback',
    component: CallbackComponent,
    data: { title: 'We Mean Pubs' }
  },
  {
    path: 'addPub',
    component: AddPubComponent,
    data: { title: 'We Mean Pubs - Add Venue' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'We Mean Pubs - Profile' }
  }
];

@NgModule({
  declarations: [
    AppComponent, PubComponent, HomeComponent, SinglePubComponent, CallbackComponent, NavComponent, FilterPipe, AddPubComponent, ProfileComponent, TypePipe
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(routes), 
    FormsModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAvZSqvzAsgYEIydyQasKzD6_6JU2nvtjQ'
    }), NgxPaginationModule
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
