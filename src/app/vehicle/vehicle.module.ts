import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    VehicleComponent
  ],
  exports: [VehicleComponent]
})
export class VehicleModule { }


