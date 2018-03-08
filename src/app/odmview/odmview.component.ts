import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'app-odmview',
  templateUrl: './odmview.component.html',
  styleUrls: ['./odmview.component.css']
})
export class OdmviewComponent implements OnInit {
  public files: UploadFile[] = [];
  public odm: Document;
  public dispODM : Array<Object> = [ { Name:"Dummy", Value: "Hummy"}];

  public loadODM(text: string) {
    var viewODM = [];
    var parser = new DOMParser();
    this.odm = parser.parseFromString(text, 'text/xml');
    var forms = this.odm.getElementsByTagName('FormDef');
    var itemgrouprefs = forms[0].getElementsByTagName('ItemGroupRef');
    var itemgroupdef;
    for(var i=0;  i < itemgrouprefs.length; i++) {
      console.log(itemgrouprefs[i]);
      var itemgroupoid = itemgrouprefs[i].getAttribute('ItemGroupOID');
      itemgroupdef = this.odm.querySelector('[OID=\''+itemgroupoid+'\']');
      viewODM.push({ Name: itemgroupdef.getAttribute('Name', ""), Value: "ItemGroup"});
      var itemrefs = itemgroupdef.getElementsByTagName('ItemRef');
      for(var j=0 ; j < itemrefs.length; j++) {
        console.log(itemrefs[j]);
        var itemdefoid = itemrefs[j].getAttribute('ItemOID');
        var itemdef = this.odm.querySelector('[OID=\''+itemdefoid+'\']');
        viewODM.push({ Name: itemdef.getAttribute('Name'), Value: itemdef.getAttribute("DataType")});
      }
    }
    this.dispODM  = viewODM.slice();
    console.log(this.dispODM);
    }
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      file.fileEntry.file(odmfile => {
        let reader:FileReader = new FileReader();
        var comp = this;
        reader.onloadend =  function(e)  {
          console.log(this.result);
          comp.loadODM(this.result);
        };
        reader.readAsText(odmfile);
      });
    }
  }
  constructor() {
  }
  ngOnInit() {
  }

}
