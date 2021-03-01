import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  linkTheme = document.querySelector('#theme');

  constructor(
    private settingsSeervice: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    // let getTheme = localStorage.getItem('theme') || './assets/css/colors/default.css';
    // this.linkTheme.setAttribute('href', getTheme);
    customInitFunctions();
    // this.sidebarService.cargarMenu();
  }

}
