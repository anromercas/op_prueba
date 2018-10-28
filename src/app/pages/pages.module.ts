import { NgModule, LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { SdrComponent } from './sdr/sdr.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ObservacionesPreventivasComponent } from './observaciones-preventivas/observaciones-preventivas.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';

import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { MisObservacionesComponent } from './observaciones-preventivas/mis-observaciones.component';
import { ObservacionComponent } from './observaciones-preventivas/observacion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './mapa/mapa.component';
import { GraficoBarrasComponent } from '../components/grafico-dona/grafico-barras.component';
import { ModificarObservacionComponent } from './observaciones-preventivas/modificar-observacion.component';
import { FormularioComponent } from './observaciones-preventivas/formulario.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        SdrComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        ObservacionesPreventivasComponent,
        MisObservacionesComponent,
        Graficas1Component,
        GraficoDonaComponent,
        ObservacionComponent,
        GoogleMapsComponent,
        MapaComponent,
        GraficoBarrasComponent,
        ModificarObservacionComponent,
        FormularioComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        SdrComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        ChartsModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCzVxJimwuNE-2EYMnp4IUUh0skkgVOFic'
          })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es' }
    ]
})

export class PagesModule { }
