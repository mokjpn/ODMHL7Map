import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  UploadEvent,
  UploadFile,
  FileSystemFileEntry
} from 'ngx-file-drop';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MappingDataService } from '../mapping-data.service';

declare var require: any;
const rdf = require('rdf');

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
          const aliases = Array.from(itemdef.getElementsByTagName('Alias'));
          let IRI = 'Undefined';
          let CDASHNAME = 'Undefined';
          for (const alias of aliases) {
            if ( alias.getAttribute('Context') === 'CDASH' )  {
              CDASHNAME = alias.getAttribute('Name');
              const vlindex = CDASHNAME.indexOf('.');
              let vlvalue, cdashvar;
              if (vlindex > 0) {
                vlvalue = CDASHNAME.substring(0, vlindex - 1);
                cdashvar = CDASHNAME.substr(vlindex + 1);
              } else {
                vlvalue = null;
                cdashvar = CDASHNAME;
              }
            const cdashdomain = cdashvar.substr(0, 2);
              IRI = 'http://rdf.cdisc.org/std/cdash-1-1#DataElement.' + cdashdomain + '.' + cdashvar ;
            }

          }
          items.push({
            Name: itemdef.getAttribute('Name'),
            Value: itemdef.getAttribute('DataType'),
            IRI: IRI,
            CDASHName: CDASHNAME
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
    let condvalue;
    let placeholdermessage;
    let error = false;
    console.log(event);
    if (this.mapping.getHL7BlankNode(event[0]) == null) {
      condvalue = 'Error: Define Copy mapping first.';
      error = true;
    } else {
      condvalue = this.mapping.getConditionValue(event[0]);
      if (condvalue == null) {
        placeholdermessage = 'Enter condition value';
        error = false;
      } else {
        placeholdermessage = 'Condition already defined';
        error = true;
      }
    }
    const dialogRef = this.dialog.open(MappingDialog, {
      width: '750px',
      data: {
        odmElement: event[0],
        cdashName: event[1],
        hl7Field: event[2],
        conditionValue: condvalue,
        placeholder: placeholdermessage,
        error: error
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  constructor(public dialog: MatDialog, private mapping: MappingDataService ) {}


  ngOnInit() {}

  update() {
    console.log(this.dispODM);
    console.log(this.pageStart);
  }

  pager(page: number) {
    this.pageStart = page;
  }
}

export class MappingData {
  odmElement: string;
  cdashName: string;
  hl7Field: string;
  conditionValue: string;
  placeholder: string;
  error: boolean;
}

@Component({
  selector: 'app-odmview-mappingdialog',
  templateUrl: './mappingdialog.html',
  styleUrls: ['./mappingdialog.css'],
})
// tslint:disable-next-line:component-class-suffix
export class MappingDialog {

  constructor(
    public dialogRef: MatDialogRef<MappingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MappingData,
    private mapping: MappingDataService ) {
    }

  doConditionalMapping(): void {
    const conditionNode = rdf.environment.createBlankNode();
    const hl7node = this.mapping.getHL7BlankNode(this.data.odmElement);
    if (hl7node == null) {
      // Copy mapping is not defined yet.
      return;
    }
    this.mapping.add(
      rdf.environment.createTriple(
        this.mapping.getHL7BlankNode(this.data.odmElement),
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#condition',
        conditionNode));
    this.mapping.add(
      rdf.environment.createTriple(
        conditionNode,
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#variable',
        this.data.hl7Field));
    this.mapping.add(
      rdf.environment.createTriple(
        conditionNode,
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#operator',
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/mappingoperator#numEqual'));
    this.mapping.add(
      rdf.environment.createTriple(
        conditionNode,
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#value',
        rdf.environment.createLiteral(this.data.conditionValue)));
    this.dialogRef.close();
  }

  doCopyMapping(): void {
    const hl7BlankNode = rdf.environment.createBlankNode();
    this.mapping.add(
      rdf.environment.createTriple(
        this.data.odmElement,
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#copyfrom',
        hl7BlankNode));
    this.mapping.add(
      rdf.environment.createTriple(
        hl7BlankNode,
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#CDASHName',
        rdf.environment.createLiteral(this.data.cdashName)));
    this.mapping.add(
      rdf.environment.createTriple(
        hl7BlankNode,
        'http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#variable',
        this.data.hl7Field));
    this.dialogRef.close();
  }

}
