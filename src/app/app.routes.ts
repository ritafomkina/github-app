import { Routes } from '@angular/router'
import { AppRoutes } from '@core'

export const APP_ROUTES: Routes = [
  {
    path: AppRoutes.HOME,
    loadChildren: () =>
      import('./modules/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: AppRoutes.REPOSITORY,
    loadChildren: () =>
      import('./modules/pages/repository/repository.module').then(m => m.RepositoryModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
