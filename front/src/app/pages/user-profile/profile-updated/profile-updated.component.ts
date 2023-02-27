import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-updated',
  templateUrl: './profile-updated.component.html',
  styleUrls: ['./profile-updated.component.scss']
})
export class ProfileUpdatedComponent {

  constructor(public dialogRef: MatDialogRef<ProfileUpdatedComponent>) { }

}
