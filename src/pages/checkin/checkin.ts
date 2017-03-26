import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    // http://ec2-54-153-113-42.us-west-1.compute.amazonaws.com/bookroom/sql.php?email=trojan@usc.edu
    this.http
      .get('http://ec2-54-153-113-42.us-west-1.compute.amazonaws.com/bookroom/sql.php?email=trojan@usc.edu')
      .subscribe(data => {
        this.reservations = [];
        let jsonData = data.json();
        console.log(jsonData);
        if (jsonData.status == 1) {
          for(let i = 0; i < jsonData.num; ++i) {
            let d = jsonData.info[i].date.substring(0, 4) + '-'
              + jsonData.info[i].date.substring(4, 6) + '-'
              + jsonData.info[i].date.substring(6, 8);
            let t = eval(jsonData.info[i].time);
            let ts = t + ':00 ~ ' + (t + 1) + ':00';
            let r = new Reservation('Leavey Library', jsonData.info[i].room, d, ts);
            this.reservations.push(r);
            console.log(r);
          }
        }
        refresher.complete();
      })
  }

}

class Reservation {
  constructor(public building: string, public room: string, public date:string, public startTime: string) {};
}
