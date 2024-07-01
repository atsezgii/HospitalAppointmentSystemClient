import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OperationClaimsService } from '../../services/operation-claims.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: 'app-add-operation-claim',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-operation-claim.component.html',
  styleUrl: './add-operation-claim.component.scss'
})
export class AddOperationClaimComponent implements OnInit{
  operationClaimFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimsService,
    private alertify: AlertifyService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.operationClaimFormGroup = this.formBuilder.group({
      name: ["",[Validators.required]],
    });
  }
  addoperationClaim(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    if (this.operationClaimFormGroup.valid) {

      this.operationClaimService.create(
        this.operationClaimFormGroup.value,
        successCallBack,
        errorCallBack
      );
      console.log("va", this.operationClaimFormGroup.value)
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.operationClaimFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    if (errorCallBack) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }
  onFormSubmit() {
    if (this.operationClaimFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.addoperationClaim();
  }
}
