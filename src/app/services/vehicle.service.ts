import { Injectable } from '@angular/core';
import { IVehicleModel } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly STORAGE_KEY = 'vehicles';

  constructor() {}

  getAll(): IVehicleModel[] {
    const vehicles = localStorage.getItem(this.STORAGE_KEY);
    return vehicles ? JSON.parse(vehicles) : [];
  }

  getById(id: number): IVehicleModel | undefined {
    const vehicles = this.getAll();
    return vehicles.find((vehicle) => vehicle.id === id);
  }

  create(vehicle: IVehicleModel): void {
    const vehicles = this.getAll();
    const newId =
      vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1;
    const newVehicle = { ...vehicle, id: newId };
    vehicles.push(newVehicle);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vehicles));
  }

  update(vehicle: IVehicleModel): void {
    const vehicles = this.getAll();
    const index = vehicles.findIndex((v) => v.id === vehicle.id);
    if (index !== -1) {
      vehicles[index] = vehicle;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vehicles));
    }
  }

  delete(id: number): void {
    const vehicles = this.getAll();
    const filteredVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredVehicles));
  }
}
