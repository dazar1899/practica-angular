import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { VehicleComponent } from './vehicle.component';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';
import { of } from 'rxjs';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;

  const mockVehicles: Vehicle[] = [
    new Vehicle('1', 'Renault', 'Logan', 'Expression', 2020, 50000, 'Blanco', 'imagen1.jpg'),
    new Vehicle('2', 'Chevrolet', 'Spark', 'GT', 2021, 30000, 'Rojo', 'imagen2.jpg'),
    new Vehicle('3', 'Nissan', 'Versa', 'Advance', 2019, 60000, 'Negro', 'imagen3.jpg')
  ];

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles']);

    await TestBed.configureTestingModule({
      imports: [VehicleComponent],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    vehicleService.getVehicles.and.returnValue(of(mockVehicles));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create table with three rows plus header', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('table');
    expect(table).toBeTruthy();

    const headerRow = table?.querySelector('thead tr');
    expect(headerRow).toBeTruthy();

    const tbodyRows = table?.querySelectorAll('tbody tr');
    expect(tbodyRows?.length).toBe(3);
  });

  it('should load vehicles on init', () => {
    fixture.detectChanges();
    
    expect(vehicleService.getVehicles).toHaveBeenCalled();
    expect(component.vehicles.length).toBe(3);
  });

  it('should display vehicle data in table rows', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    
    expect(rows.length).toBe(3);
    
    const firstRow = rows[0];
    const cells = firstRow.querySelectorAll('td');
    expect(cells[0]?.textContent?.trim()).toBe('Renault');
    expect(cells[1]?.textContent?.trim()).toBe('Logan');
    expect(cells[2]?.textContent?.trim()).toBe('2020');
  });
});

