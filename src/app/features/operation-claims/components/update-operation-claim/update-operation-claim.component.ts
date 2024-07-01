import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListOperationClaims } from '../../models/list-operation-claims';
import { OperationClaimsService } from '../../services/operation-claims.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationClaimShareDataService } from '../../services/operation-claim-share-data.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: 'app-update-operation-claim',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-operation-claim.component.html',
  styleUrl: './update-operation-claim.component.scss'
})
export class UpdateOperationClaimComponent implements OnInit{
  operationClaimDetailFormGroup: FormGroup;
  operationClaim: ListOperationClaims;

  constructor(private formBuilder: FormBuilder,
    private operationClaimService:OperationClaimsService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private operationClaimDataShareService: OperationClaimShareDataService,
  ){}
  ngOnInit(): void {
    this.createForm();
    this.getDetailOfoperationClaim();
  }

  private createForm() {
    this.operationClaimDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["",[Validators.required]]
    });
  }
  private getDetailOfoperationClaim() {
    this.route.paramMap.subscribe(params => {
      const operationClaimId = +params.get("id");
      console.log("id",operationClaimId)
      this.operationClaimDataShareService.currentoperationClaim.subscribe(operationClaim => {
        if (operationClaim && operationClaim.id === operationClaimId) {
          this.operationClaim = operationClaim;
          this.operationClaimDetailFormGroup.patchValue(operationClaim);
        }
      });
    });
  }
  updateoperationClaim() {
    this.operationClaimService.updateoperationClaim(this.operationClaimDetailFormGroup.value).subscribe(
      response => {
        console.log('operationClaim updated:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/admin/claims']);
      },
      error => {
        console.error('Operation Claim could not be updated:', error);
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  onSubmit() {
    if (this.operationClaimDetailFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.updateoperationClaim();
  }
}
