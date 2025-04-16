import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { IVehicleModel } from '../../models/vehicle.model';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
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
  filteredDataSource: IVehicleModel[] = [];
  searchControl = new FormControl('');
  showSearch = false;

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.setupSearch();
  }

  loadVehicles(): void {
    this.dataSource = this.vehicleService.getAll();
    this.filteredDataSource = [...this.dataSource];
    this.showSearch = this.dataSource.length >= 6;
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.filteredDataSource = this.dataSource.filter((vehicle) =>
            vehicle.placa.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          this.filteredDataSource = [...this.dataSource];
        }
      });
  }

  deleteVehicle(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir este veículo?',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.delete(id);
        this.loadVehicles();
      }
    });
  }
}
