import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { ThemeDetailsPageComponent } from "./theme-details-page/theme-details-page.component";
import { ThemesNewPageComponent } from "./themes-new-page/themes-new-page.component";
import { ThemesPageComponent } from "./themes-page/themes-page.component";

const routes: Routes = [
    {
        path: 'themes',
        component: ThemesPageComponent
    },
    {
        path: 'themes/new',
        canActivate: [AuthGuard],
        component: ThemesNewPageComponent
    },
    {
        path: 'themes/:themeId',
        component: ThemeDetailsPageComponent
    }
]

export const ThemesRoutingModule = RouterModule.forChild(routes);