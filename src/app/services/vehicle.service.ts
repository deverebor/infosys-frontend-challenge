import { Injectable } from '@angular/core';
import { IVehicleModel } from '../models/vehicle.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: IVehicleModel[] = [
    {
      id: 1,
      placa: 'ABC-1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '00123456789',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2020,
    },
    //@note(deverebor): add more mock values
  ];

  constructor() {}

  getAll(): Observable<IVehicleModel[]> {
    return of(this.vehicles);
  }

  getById(id: number): Observable<IVehicleModel | undefined> {
    const vehicle = this.vehicles.find((v) => v.id === id);
    return of(vehicle);
  }

  create(vehicle: IVehicleModel): Observable<IVehicleModel> {
    vehicle.id =
      this.vehicles.length > 0
        ? Math.max(...this.vehicles.map((v) => v.id)) + 1
        : 1;
    this.vehicles.push(vehicle);
    return of(vehicle);
  }

  update(vehicle: IVehicleModel): Observable<IVehicleModel> {
    const index = this.vehicles.findIndex((v) => v.id === vehicle.id);
    if (index >= 0) {
      this.vehicles[index] = vehicle;
    }
    return of(vehicle);
  }

  delete(id: number): Observable<boolean> {
    const index = this.vehicles.findIndex((v) => v.id === id);
    if (index >= 0) {
      this.vehicles.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
