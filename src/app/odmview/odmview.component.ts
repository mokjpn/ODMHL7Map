import {
  Component,
  OnInit
} from '@angular/core';
import {
  UploadEvent,
  UploadFile,
  FileSystemFileEntry
} from 'ngx-file-drop';

@Component({
  selector: 'app-odmview',
  templateUrl: './odmview.component.html',
  styleUrls: ['./odmview.component.css']
})
export class OdmviewComponent implements OnInit {
  public files: UploadFile[] = [];
  public odm: Document;
  public dispODM: Array < Object > = [{
    FormName: 'Form Not uploaded',
    Sections: [{
      SectionName: 'Undefined',
      Items: [{
        Name: 'Undefined',
        Value: 'Undefined'
      }]
    }]
  }];
  public pageStart = 0;

  public loadODM(text: string) {
    this.dispODM = [];
    const parser = new DOMParser();
    this.odm = parser.parseFromString(text, 'text/xml');
    const formselements = this.odm.getElementsByTagName('FormDef');
    for (let k = 0; k < formselements.length; k++) {
      const sections: Array < Object > = [];
      const aform = {
        FormName: formselements[k].getAttribute('Name'),
        Sections: sections
      };
      const itemgrouprefs = formselements[k].getElementsByTagName('ItemGroupRef');
      for (let i = 0; i < itemgrouprefs.length; i++) {
        const itemgroupoid = itemgrouprefs[i].getAttribute('ItemGroupOID');
        const itemgroupdef = this.odm.querySelector('[OID=\'' + itemgroupoid + '\']');
        const items: Array < Object > = [];
        const asection = {
          SectionName: itemgroupdef.getAttribute('Name'),
          Items: items
        };
        const itemrefs = itemgroupdef.getElementsByTagName('ItemRef');
        for (let j = 0; j < itemrefs.length; j++) {
          const itemdefoid = itemrefs[j].getAttribute('ItemOID');
          const itemdef = this.odm.querySelector('[OID=\'' + itemdefoid + '\']');
          items.push({
            Name: itemdef.getAttribute('Name'),
            Value: itemdef.getAttribute('DataType')
          });
        }
        sections.push(asection);
      }
      this.dispODM.push(aform);
    }
  }
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file(odmfile => {
          const reader: FileReader = new FileReader();
          const comp = this;
          reader.onloadend = function (e) {
            // console.log(this.result);
            comp.loadODM(this.result as string);
          };
          reader.readAsText(odmfile);
        });
      }
    }
  }

  public itemdrop(event: any) {
    console.log(event);
  }
  constructor() {}

  ngOnInit() {}

  update() {
    console.log(this.dispODM);
    console.log(this.pageStart);
  }

  pager(page: number) {
    this.pageStart = page;
  }
}

