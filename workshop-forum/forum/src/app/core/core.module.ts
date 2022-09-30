import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostService } from './post.service';
import { storageServiceProvider } from './storage.service';
import { ThemeService } from './theme.service';
import { UserService } from './user.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: UserService,
      useClass: UserService
    },
    storageServiceProvider,
    ThemeService,
    PostService
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
