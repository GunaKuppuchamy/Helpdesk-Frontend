import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideEchartsCore } from 'ngx-echarts';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),

    provideEchartsCore({
      echarts : () =>import('echarts')
    })
  ]
};



