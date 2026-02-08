import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as fasStar, faHandshake as fasHandshake, faRoad as fasRoad, faBook as fasBook, faEnvelope as fasEnvelope, faPhone as fasPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub as fasGithub, faLinkedin as fasLinkedin } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, fasHandshake, fasBook, fasRoad, fasEnvelope, fasGithub, fasLinkedin, fasPhone);}
 }
