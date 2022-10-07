import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from './time-ago.pipe';
import { MyCounterComponent } from './my-counter/my-counter.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    TimeAgoPipe,
    MyCounterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ 
    WelcomeComponent,
    TimeAgoPipe 
  ]
})
export class SharedModule { }
