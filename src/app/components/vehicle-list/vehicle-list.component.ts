import { Component, OnInit } from '@angular/core';
import { IVehicleModel } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  imports: [MatTableModule, RouterModule, MatIconModule],
  standalone: true,
})
export class VehicleListComponent implements OnInit {
  vehicles: IVehicleModel[] = [];
  displayedColumns: string[] = ['id', 'placa', 'modelo', 'marca', 'actions'];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService
      .getAll()
      .subscribe((vehicles) => (this.vehicles = vehicles));
  }

  deleteVehicle(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.vehicleService.delete(id).subscribe((success) => {
        if (success) {
          this.loadVehicles();
        }
      });
    }
  }
}
