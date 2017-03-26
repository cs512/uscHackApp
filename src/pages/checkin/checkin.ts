import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) { }

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
            let r = new Reservation('Leavey Library', jsonData.info[i].room, d, jsonData.info[i].time);
            this.reservations.push(r);
            console.log(r);
          }
        }
        refresher.complete();
      })
  }

  toInt(i: string) {
    return parseInt(i, 10);
  }

  deleteRoom(date: string, room: string, time: number) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({headers: headers});
    this.http
      .post('http://ec2-54-153-113-42.us-west-1.compute.amazonaws.com/bookroom/rest.php/'+date.replace(/-/g, '')+'/'+room+'/'+time + '/cancel',
        'email=trojan@usc.edu', options)
      .subscribe(data => {
        console.log(data);
        if (data.json().status == 1) {
          let toast = this.toastCtrl.create({
            message: 'Deleted',
            duration: 3000
          });
          toast.present();
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
                  let r = new Reservation('Leavey Library', jsonData.info[i].room, d, jsonData.info[i].time);
                  this.reservations.push(r);
                  console.log(r);
                }
              }
            })
        }
      });
  }

  doCheckin(date: string, room: string, time: number) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({headers: headers});
    this.http
      .post('http://ec2-54-153-113-42.us-west-1.compute.amazonaws.com/bookroom/rest.php/'+date.replace(/-/g, '')+'/'+room+'/'+time + '/checkin',
        'email=trojan@usc.edu', options)
      .subscribe(data => {
        console.log(data);
        if (data.json().status == 1) {
          let toast = this.toastCtrl.create({
            message: 'Deleted',
            duration: 3000
          });
          toast.present();
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
                  let r = new Reservation('Leavey Library', jsonData.info[i].room, d, jsonData.info[i].time);
                  this.reservations.push(r);
                  console.log(r);
                }
              }
            })
        }
      });
  }

}

class Reservation {
  constructor(public building: string, public room: string, public date:string, public startTime: number) {};
}
