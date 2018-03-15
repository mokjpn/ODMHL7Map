import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { TreeModule, TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-ssmixtree',
  templateUrl: './ssmixtree.component.html',
  styleUrls: ['./ssmixtree.component.css']
})
export class SsmixtreeComponent implements OnInit {
  public nodes: any[] = [ {name: 'root', children: []} ];
  public options = {};
  public files: UploadFile[] = [];
  public hl7text: string;

  @Output() selected = new EventEmitter();
  public viewhl7(contents): any {
    this.selected.emit(contents);
  }

  public setHL7Contents(node, text ) {
    node['contents'] = text;
  }

  private addNode(node: Object, array: string[]): any {
    for (let i = 0, length = array.length; i < length; i++) {
      if(node['children']) {
        var cni;
        var cn = node['children'].some((item, index) => {
          if (item.name == array[i]) {
            cni = index;
            return (true);
          }
        });
        if(cn) {
          node = node['children'][cni];
        } else {
          node['children'].push( { name: array[i], children: []});
          node = node['children'][node['children'].length-1];
        } 
      } else {
        node = node['children'] = [{ name: array[i] ,children: []}];
      }
    }
//    this.tree.treeModel.update();
    return(node);
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      const fpaths: string[] = file.relativePath.split('/');
      let lnode: any = this.addNode(this.nodes[0], fpaths);
      //console.log(lnode);
      file.fileEntry.file(
        hl7file => {
          let reader: FileReader = new FileReader();
          var comp = this;
          reader.onloadend = function(e)  {
            comp.setHL7Contents(lnode,this.result);
          };
        reader.readAsText(hl7file);
    });
    }
    this.nodes[0].hasChildren = true;
  }

  constructor() { }

  update() {
    this.tree.treeModel.update();
    console.log(this.nodes);
  }

  ngOnInit() {
  }

}
