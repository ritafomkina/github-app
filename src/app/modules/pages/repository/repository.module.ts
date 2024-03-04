import { NgModule } from '@angular/core'
import { RepositoryRoutingModule } from './repository-routing.module'
import { CommonModule } from '@angular/common'
import { RepositoryComponent } from './repository.component'

@NgModule({
  declarations: [
    RepositoryComponent,
  ],
  imports: [
    RepositoryRoutingModule,
    CommonModule,
  ],
})
export class RepositoryModule {}
