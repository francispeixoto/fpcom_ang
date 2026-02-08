import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHandshake as fasHandshake } from '@fortawesome/free-solid-svg-icons';
import { faRoad as fasRoad } from '@fortawesome/free-solid-svg-icons';
import { faBook as fasBook } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub as fasGithub, faLinkedin as fasLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone as fasPhone } from '@fortawesome/free-solid-svg-icons';


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
