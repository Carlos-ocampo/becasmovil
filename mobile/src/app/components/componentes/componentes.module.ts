import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisModalComponent } from '../pais-modal/pais-modal.component';



@NgModule({
  declarations: [PaisModalComponent],
  imports: [
    CommonModule
  ],
  exports: [PaisModalComponent]
})
export class ComponentesModule { }
