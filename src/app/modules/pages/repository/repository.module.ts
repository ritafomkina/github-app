import { NgModule } from '@angular/core'
import { RepositoryRoutingModule } from './repository-routing.module'
import { CommonModule } from '@angular/common'
import { RepositoryComponent } from './repository.component'
import { LinkComponent } from '@shared/ui'

@NgModule({
  declarations: [
    RepositoryComponent,
  ],
  imports: [
    RepositoryRoutingModule,
    CommonModule,
    LinkComponent,
  ],
})
export class RepositoryModule {}
