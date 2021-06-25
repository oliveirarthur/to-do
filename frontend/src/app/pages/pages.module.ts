import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BoardComponent } from './board/board.component';
import { ComponentsModule } from '../components/components.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    NgbTooltipModule,
  ],
})
export class PagesModule {}
