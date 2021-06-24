import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BoardComponent } from './board/board.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, PagesRoutingModule, ComponentsModule],
})
export class PagesModule {}
