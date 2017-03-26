import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Checkin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})

export class CheckinPage {
  
  public reservations: Reservation[] = [];//'{[{"building":"Leavey Library", "room":"A1", "startTime":"13:00 pm ~ 14:00 pm"}]}';
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.reservations.push(new Reservation("Leavey Library", "A1", "2017-03-31", "13:00 pm ~ 14:00 pm"));
      refresher.complete();
    }, 500);
  }

}

class Reservation {
  constructor(public building: string, public room: string, public date:string, public startTime: string) {};
}
