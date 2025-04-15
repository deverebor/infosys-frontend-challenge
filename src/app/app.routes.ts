import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

export const routes: Routes = [
  { path: 'veiculos', component: VehicleListComponent },
  { path: 'veiculos/novo', component: VehicleFormComponent },
  { path: 'veiculos/editar/:id', component: VehicleFormComponent },
  { path: '', redirectTo: '/veiculos', pathMatch: 'full' },
];
