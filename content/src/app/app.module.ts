import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ContentComponent } from './components/content/content.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { TableComponent } from './components/table/table.component';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MenuComponent } from './components/menu/menu.component';
import { DetailMovieComponent } from './components/detail-movie/detail-movie.component';
import { Routes, RouterModule } from '@angular/router';
import { ChangeDirective } from './directives/change.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'detailmovie/:id', component: DetailMovieComponent },
  { path: 'movies', component: TableComponent, canActivate:[AuthGuard]},
  { path: 'form', component: FormComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: DashboardComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    DialogComponent,
    FormComponent,
    LoginComponent,
    TableComponent,
    MenuComponent,
    DetailMovieComponent,
    ChangeDirective,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
          ),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('561602290896109'),
        },
        {
          id: AmazonLoginProvider.PROVIDER_ID,
          provider: new AmazonLoginProvider(
            'amzn1.application-oa2-client.f074ae67c0a146b6902cc0c4a3297935'
          ),
        },
        // {
        //   provide: DateAdapter, useClass: AppDateAdapter
        // },
        // {
        //   provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        // },
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
  entryComponents: [ TableComponent, ContentComponent ],
  exports: [RouterModule]
})
export class AppModule { }
