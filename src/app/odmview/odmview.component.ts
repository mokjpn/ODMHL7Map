import {
  Component,
  OnInit
} from '@angular/core';
import {
  UploadEvent,
  UploadFile
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
    FormName: "Form Not uploaded",
    Sections: [{
      SectionName: "Undefined",
      Items: [{
        Name: "Undefined",
        Value: "Undefined"
      }]
    }]
  }];
  public pageStart = 0;

  public loadODM(text: string) {
    this.dispODM = [];
    var parser = new DOMParser();
    this.odm = parser.parseFromString(text, 'text/xml');
    var formselements = this.odm.getElementsByTagName('FormDef');
    for (var k = 0; k < formselements.length; k++) {
      var sections: Array < Object > = [];
      var aform = {
        FormName: formselements[k].getAttribute('Name'),
        Sections: sections
      };
      var itemgrouprefs = formselements[k].getElementsByTagName('ItemGroupRef');
      for (var i = 0; i < itemgrouprefs.length; i++) {
        var itemgroupoid = itemgrouprefs[i].getAttribute('ItemGroupOID');
        var itemgroupdef = this.odm.querySelector('[OID=\'' + itemgroupoid + '\']');
        var items: Array < Object > = [];
        var asection = {
          SectionName: itemgroupdef.getAttribute('Name'),
          Items: items
        };
        var itemrefs = itemgroupdef.getElementsByTagName('ItemRef');
        for (var j = 0; j < itemrefs.length; j++) {
          var itemdefoid = itemrefs[j].getAttribute('ItemOID');
          var itemdef = this.odm.querySelector('[OID=\'' + itemdefoid + '\']');
          items.push({
            Name: itemdef.getAttribute('Name'),
            Value: itemdef.getAttribute("DataType")
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
      file.fileEntry.file(odmfile => {
        let reader: FileReader = new FileReader();
        var comp = this;
        reader.onloadend = function (e) {
          // console.log(this.result);
          comp.loadODM(this.result);
        };
        reader.readAsText(odmfile);
      });
    }
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

