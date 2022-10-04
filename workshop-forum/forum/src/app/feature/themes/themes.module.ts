import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { PostListComponent } from './post-list/post-list.component';
import { ThemeListItemComponent } from './theme-list-item/theme-list-item.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemesPageComponent } from './themes-page/themes-page.component';
import { ThemesRoutingModule } from './themes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeDetailsPageComponent } from './theme-details-page/theme-details-page.component';
import { ThemesNewPageComponent } from './themes-new-page/themes-new-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ThemeListComponent,
    AsideComponent,
    ThemeListItemComponent,
    PostListComponent,
    ThemesPageComponent,
    ThemeDetailsPageComponent,
    ThemesNewPageComponent
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    // ThemeListComponent,
    // AsideComponent,
    // ThemeListItemComponent,
    // PostListComponent
  ]
})
export class ThemesModule { }
