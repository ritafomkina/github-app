import { NgModule } from '@angular/core'
import { RepositoryRoutingModule } from './repository-routing.module'
import { CommonModule } from '@angular/common'
import { RepositoryComponent } from './repository.component'
import { LinkComponent } from '@shared/ui'
import { RepoContentComponent } from './components/repo-content/repo-content.component'
import { AuthorContentComponent } from './components/author-content/author-content.component'

@NgModule({
  declarations: [
    RepositoryComponent,
  ],
  imports: [
    RepositoryRoutingModule,
    CommonModule,
    LinkComponent,
    RepoContentComponent,
    AuthorContentComponent,
  ],
})
export class RepositoryModule {}
