import {
  Component,
  OnInit
} from '@angular/core';
import {
  UploadEvent,
  UploadFile,
  FileSystemFileEntry
} from 'ngx-file-drop';

declare var require: any;
const hl72json = require('qewd-hl72json');
const jsonToTable = require('json-to-table');

@Component({
  selector: 'app-hl7-table',
  templateUrl: './hl7-table.component.html',
  styleUrls: ['./hl7-table.component.css']
})
export class Hl7TableComponent implements OnInit {
  public files: UploadFile[] = [];
  public hl7table;
  public hl7header = [];
  public hl7contents;
  public hl7whole: Array<Object>;
  public hl7segments = [];
  public cols;

  public filterValues(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].hasOwnProperty('value')) {
          data[key] = data[key].value;
        } else if (typeof data[key] === 'object') {
          this.filterValues(data[key]);
        }
      }
    }
  }
  public loadHL7(message: string): void {
    // console.log(message.split('\r'));
    // tslint:disable-next-line:prefer-const
    this.hl7whole = hl72json(message.split('\r'), '2.5');
    this.hl7segments = Object.keys(this.hl7whole);
    const msh = this.hl7whole['MSH'];
    this.filterValues(msh);
    this.hl7table = jsonToTable(msh);
    this.hl7header = this.hl7table[0];
    this.hl7contents = this.hl7table.slice(1, this.hl7table.length);
    // console.log(this.hl7table);
  }

  public changeSegment(seg: string): void {
    const segm = this.hl7whole[seg];
    this.filterValues(segm);
    this.hl7table = jsonToTable(segm);
    this.hl7header = this.hl7table[0];
    this.hl7contents = this.hl7table.slice(1, this.hl7table.length);
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file(hl7file => {
          const reader: FileReader = new FileReader();
          const comp = this;
          reader.onloadend = function (e) {
            console.log(this.result);
            comp.loadHL7(this.result as string);
          };
          reader.readAsText(hl7file);
        });
      }
    }
  }

  constructor() {
    this.hl7table = [
      ['', ''],
      ['', '']
    ];
  }

  ngOnInit() {}

  update() {
    console.log(this.hl7contents);
  }


}

