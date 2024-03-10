import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { SearchingComponent } from '@core'
import { ButtonComponent } from '@shared/ui'


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SearchingComponent,
    ButtonComponent,
  ],
})
export class HomeModule {}
