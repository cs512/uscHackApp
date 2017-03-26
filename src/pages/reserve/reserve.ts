import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Reserve page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html'
})

export class ReservePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage, public toastCtrl: ToastController) {
    this.minDate = new Date().toLocaleDateString().replace(/\//g, '-');
    this.minDate = new Date(this.minDate).toISOString().substring(0, 10);
    this.selectDate.month = this.minDate;
    console.log(this.minDate);
    let d = new Date();
    d.setDate(d.getDate() + 7);
    let s = d.toLocaleDateString().replace(/\//g, '-');
    this.maxDate = new Date(s).toISOString().substring(0, 10);
    console.log(this.maxDate);
    for (let i = 0; i < 24; i += 4) {
      this.slidePages.push(new SlidePage(i, []));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

  public selectDate = {
    month: ''
  };

  public minDate = '';
  public maxDate = '';
  public slidePages: SlidePage[] = [];
  public selectedTime = '';
  public selectedRoom = '';

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    console.log(this.selectDate.month.replace(/-/g, ''));

    this.http.get("http://ec2-54-153-113-42.us-west-1.compute.amazonaws.com/bookroom/rest.php/"+this.selectDate.month.replace(/-/g, '')).subscribe(data => {
      var item = data.json();
      console.log(data);
      if (item.status == 1) {
        this.refreshTable(item);
      } else {
        console.log("error");
      }
      refresher.complete();
    });

  }

  refreshTable(tableData) {
    let rms: Room[] = [];
    console.log(tableData.rooms)
    for (let roomName in tableData.rooms) {
      console.log(tableData.rooms[roomName])
      var r = new Room(roomName, []);
      for (let i = 0; i < 24; ++i) {
        r.status.push(tableData.rooms[roomName]['t' + i]);
      }
      rms.push(r);
    }
    for (let pages of this.slidePages) {
      pages.rooms = rms;
    }
  }

  selectDateTimeRoom(date, time, room) {
    console.log(date);
    if (date == 'occ') {
      return;
    }
    console.log(1);
    this.selectedRoom = room;
    this.selectedTime = time;
  }

  confirmRoom() {
    this.storage.get('email').then((email) => {
          console.log(email);
          email = 'trojan@usc.edu'
          if (email != '') {
            let o = new Object()
            o['email'] = email;
            let headers = new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
            });
            let options = new RequestOptions({headers: headers});
            this.http.post(
              "http://ec2-54-153-113-42.us-west-1.compute.amazonaws.com/bookroom/rest.php/"+this.selectDate.month.replace(/-/g, '')+'/'+this.selectedRoom+'/'+this.selectedTime,
              'email='+email, options).subscribe(data => {
                console.log(options);
                let toast = this.toastCtrl.create({
                  message: 'Please verify your confirmation email.',
                  duration: 3000
                });
                toast.present();
              });
          } else {
            let toast = this.toastCtrl.create({
              message: 'Please set your email.',
              duration: 3000
            });
            toast.present();
          }
        });
  }

}

class SlidePage {

  public title = "";

  constructor(public startHour: number,  public rooms: Room[]){
    this.title = startHour.toString() + ":00 ~ " + (startHour + 5).toString() + ":00";
  }

}

class Room {
  constructor(public name: string,  public status: string[]){}
}