import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
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

    this.http.get("/test/hack/data.json").subscribe(data => {
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
    let status = tableData.status;
    let rms: Room[] = [];
    console.log(tableData.rooms)
    for (let roomName in tableData.rooms) {
      console.log(tableData.rooms[roomName])
      var r = new Room(roomName, []);
      for (let i = 0; i < 24; ++i) {
        r.status.push(tableData.rooms[roomName][i]);
      }
      rms.push(r);
    }
    for (let pages of this.slidePages) {
      pages.rooms = rms;
    }
  }

  selectDateTimeRoom(date, time, room) {
    console.log(date);
    if (date != 'ava') {
      return;
    }
    console.log(1);
    this.selectedRoom = room;
    this.selectedTime = time;
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