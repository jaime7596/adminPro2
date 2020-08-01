import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  linkTheme = document.querySelector('#theme');

  constructor(private settingsSeervice: SettingsService) { }

  ngOnInit() {
    // let getTheme = localStorage.getItem('theme') || './assets/css/colors/default.css';
    // this.linkTheme.setAttribute('href', getTheme);
    customInitFunctions();
  }

}
