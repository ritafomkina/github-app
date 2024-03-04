import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
  ],
})
export class HomeModule {}
console.log('home')
