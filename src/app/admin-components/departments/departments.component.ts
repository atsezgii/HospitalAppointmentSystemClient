import { Component } from '@angular/core';
import { ListDepartmentComponent } from '../../features/departments/components/list-department/list-department.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [ListDepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {

}
