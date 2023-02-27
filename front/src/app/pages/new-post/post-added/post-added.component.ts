import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-added',
  templateUrl: './post-added.component.html',
  styleUrls: ['./post-added.component.scss']
})
export class PostAddedComponent {

  constructor(public dialogRef: MatDialogRef<PostAddedComponent>) { }

}
