import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicleModel } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  standalone: true,
})
export class VehicleFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  vehicleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      placa: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{3}-?\d{4}$/)],
      ],
      chassi: [
        '',
        [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)],
      ],
      renavam: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      cor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.vehicleId = +params['id'];
        this.loadVehicle(this.vehicleId);
      }
    });
  }

  loadVehicle(id: number): void {
    const vehicle = this.vehicleService.getById(id);
    if (vehicle) {
      this.form.patchValue(vehicle);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const vehicle: IVehicleModel = {
        ...this.form.value,
        id: this.isEdit && this.vehicleId ? this.vehicleId : 0,
      };

      if (this.isEdit && this.vehicleId) {
        this.vehicleService.update(vehicle);
      } else {
        this.vehicleService.create(vehicle);
      }

      this.router.navigate(['/veiculos']);
    }
  }
}
