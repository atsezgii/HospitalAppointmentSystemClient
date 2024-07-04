export class CreateAppointment{
  patientId:number;
  appointmentSlotId:number;
  status:boolean;
  startTime:Date;
  endTime?: Date;
}
