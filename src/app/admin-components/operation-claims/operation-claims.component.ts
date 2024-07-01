import { Component } from '@angular/core';
import { ListClaimsComponent } from '../../features/operation-claims/components/list-claims/list-claims.component';

@Component({
  selector: 'app-operation-claims',
  standalone: true,
  imports: [ListClaimsComponent],
  templateUrl: './operation-claims.component.html',
  styleUrl: './operation-claims.component.scss'
})
export class OperationClaimsComponent {

}
