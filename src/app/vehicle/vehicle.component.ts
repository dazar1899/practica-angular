import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  ngOnInit(): void {
    this.getVehicles();
  }

}


