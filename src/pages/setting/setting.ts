import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  public email: string = "";
  public firstName: string = "";
  public lastName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    console.log('Storage ready!');
    this.storage.get('hasInit').then((hasInit) => {
      if (hasInit != null) {
        this.storage.get('email').then((email) => {
          this.email = email;
        });
        this.storage.get('firstName').then((firstName) => {
          this.firstName = firstName;
        });
        this.storage.get('lastName').then((lastName) => {
          this.lastName = lastName;
        });
      }
    });
  }

  updateInfo() {
    this.storage.set('email', this.email);
    this.storage.set('firstName', this.firstName);
    this.storage.set('lastName', this.lastName);
    this.storage.set('hasInit', 'true');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
