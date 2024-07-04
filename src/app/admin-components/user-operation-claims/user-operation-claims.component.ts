import { Component } from '@angular/core';
import { ListUserClaimsComponent } from '../../features/user-operation-claims/components/list-user-claims/list-user-claims.component';

@Component({
  selector: 'app-user-operation-claims',
  standalone: true,
  imports: [ListUserClaimsComponent],
  templateUrl: './user-operation-claims.component.html',
  styleUrl: './user-operation-claims.component.scss'
})
export class UserOperationClaimsComponent {

}
