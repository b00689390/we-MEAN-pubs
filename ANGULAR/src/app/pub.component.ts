import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PubComponent {
  message: number;

  constructor(private webService: WebService,
    private authService: AuthService) { }

  ngOnInit() {
    this.webService.getPubs();
    this.webService.currentMessage.subscribe(message => this.message = message);
  }


  deletePub(id) {
    this.webService.deletePub(id)
      .subscribe(res => {
        console.log('Deleted');
        this.webService.getPubs();
      });
  }


  pub_list;
}
