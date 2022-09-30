import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostService } from './post.service';
import { storageServiceProvider } from './storage.service';
import { ThemeService } from './theme.service';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
}) 
// Tъй като Core Module провайдва тези сървиси, ако бъдат декларирани в imports масива, то всеки път, когато
// Core Module бъде импортнат в друг модул, за съответния модул ще се създава нова инстанция на тези сървиси.
// Eкспортвайки класа CoreModule със стачината функция forRoot() се предоставя възможност на всеки модул, който
// има нужда от провайдърите на Core Module, да го импортне чрез CoreModule.forRoot() - MooduleWithProviders, като в този случай за всички
// сървиси ще бъде създадена нова инстанция. Онези модули, които нямат нужда от провайдърите в Core Module, а само 
// от директивите, пайповете, компонентите, могат да го импортнат просто като CoreModule.
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> { // interface ModuleWithProviders<T>
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: UserService,
          useClass: UserService
        },
        storageServiceProvider,
        ThemeService,
        PostService
      ]
    }
  }
}
