import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './feature/pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { counterReducer, currentUserReducer, IRootState } from './+store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule.forRoot(),
    RouterModule,
    PagesModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot<IRootState>({
      counter: counterReducer,
      currentUser: currentUserReducer
    }),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25,
      logOnly: environment.production 
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => { 
        return () => authService.authenticate$(); // асинхронна операция, като всички компоненти ще бъдат инициализирани едва след приключване на асинхронната операция
      },
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
