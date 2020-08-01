import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Modulos Propios
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';

// Modulos Externos
import { ChartsModule } from 'ng2-charts';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    

  ],
  exports : [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    RouterModule,
    AccountSettingsComponent
    
  ]
})
export class PagesModule { }
