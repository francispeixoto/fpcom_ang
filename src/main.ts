import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faPhone, faHandshake, faRoad, faBook } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faEnvelope, faPhone, faHandshake, faRoad, faBook, faLinkedin);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
