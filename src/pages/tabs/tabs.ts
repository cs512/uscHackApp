import { Component } from '@angular/core';

import { ReservePage } from '../reserve/reserve';
import { CheckinPage } from '../checkin/checkin';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  reserveTab: any = ReservePage;
  checkinTab: any = CheckinPage;
  settingTab: any = SettingPage;

  constructor() {

  }
}
