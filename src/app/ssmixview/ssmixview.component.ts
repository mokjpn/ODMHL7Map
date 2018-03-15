import { Component, OnInit, ViewChild } from '@angular/core';
import { Hl7TableComponent } from '../hl7-table/hl7-table.component';

@Component({
  selector: 'app-ssmixview',
  templateUrl: './ssmixview.component.html',
  styleUrls: ['./ssmixview.component.css']
})
export class SsmixviewComponent implements OnInit {

  @ViewChild(Hl7TableComponent)
  private hl7table: Hl7TableComponent;
  public viewhl7(hl7text: string) {
    this.hl7table.loadHL7(hl7text);
  }
  constructor() { }

  ngOnInit() {
  }

}
