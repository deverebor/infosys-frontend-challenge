import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicleModel } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
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
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
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
    this.vehicleService.getById(id).subscribe((vehicle) => {
      if (vehicle) {
        this.form.patchValue(vehicle);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const vehicle: IVehicleModel = this.form.value;

      if (this.isEdit && this.vehicleId) {
        vehicle.id = this.vehicleId;
        this.vehicleService.update(vehicle).subscribe(() => {
          this.router.navigate(['/veiculos']);
        });
      } else {
        this.vehicleService.create(vehicle).subscribe(() => {
          this.router.navigate(['/veiculos']);
        });
      }
    }
  }
}
