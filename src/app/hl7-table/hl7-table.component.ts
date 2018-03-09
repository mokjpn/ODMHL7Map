import {
  Component,
  OnInit
} from '@angular/core';
import {
  UploadEvent,
  UploadFile
} from 'ngx-file-drop';

declare var require: any
var hl72json = require('qewd-hl72json');
var jsonToTable = require('json-to-table');

@Component({
  selector: 'app-hl7-table',
  templateUrl: './hl7-table.component.html',
  styleUrls: ['./hl7-table.component.css']
})
export class Hl7TableComponent implements OnInit {

  public loadHL7(message: string): void {
    // console.log(message.split('\r'));
    let jsonHL7: string;
    jsonHL7 = hl72json(message.split('\r'), '2.5');
    console.log(jsonHL7);
    var obx = jsonHL7["OBX"];
    this.hl7table = jsonToTable(obx);
    this.hl7header = this.hl7table[0];
    this.hl7contents = this.hl7table.slice(1, this.hl7table.length);
    console.log(this.hl7table);
  }
  public files: UploadFile[] = [];
  public hl7table;
  public hl7header = [];
  public hl7contents;
  public cols;

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      file.fileEntry.file(hl7file => {
        let reader: FileReader = new FileReader();
        var comp = this;
        reader.onloadend = function (e) {
          console.log(this.result);
          comp.loadHL7(this.result);
        };
        reader.readAsText(hl7file);
      });
    }
  }

  constructor() {
    this.hl7table = [
      ["", ""],
      ["", ""]
    ];
  }

  ngOnInit() {}

  update() {
    console.log(this.hl7contents);
  }


}

