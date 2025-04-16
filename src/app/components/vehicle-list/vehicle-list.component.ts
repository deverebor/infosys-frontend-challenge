import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehicleService } from '../../services/vehicle.service';
import { IVehicleModel } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  displayedColumns: string[] = [
    'placa',
    'marca',
    'modelo',
    'ano',
    'cor',
    'actions',
  ];
  dataSource: IVehicleModel[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.dataSource = this.vehicleService.getAll();
  }

  deleteVehicle(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.vehicleService.delete(id);
      this.loadVehicles();
    }
  }
}
