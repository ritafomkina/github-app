import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { CommonModule } from '@angular/common'
import { SearchingComponent } from '@core'
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SearchingComponent,
    MatButtonModule,
  ],
})
export class HomeModule {}
console.log('home')
