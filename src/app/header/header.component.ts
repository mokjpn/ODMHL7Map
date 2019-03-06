import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MappingDataService } from '../mapping-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private mapping: MappingDataService ) { }

  ngOnInit() {
  }
  public viewMap(event: any) {
    console.log(event);
    console.log(this.mapping.output());
    const dialogRef = this.dialog.open(MapViewDialog, {
      width: '750px',
      data: { rdfdata: this.mapping.output() }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export class MappingData {
  rdfdata: string;
}

@Component({
  selector: 'app-header-mapviewdialog',
  templateUrl: './mapviewdialog.html',
  styleUrls: ['./mapviewdialog.css'],
})
// tslint:disable-next-line:component-class-suffix
export class MapViewDialog {
    constructor(
      public dialogRef: MatDialogRef <MapViewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: MappingData) {
      }

    onNoClick(): void {
      this.dialogRef.close();
  }
}



