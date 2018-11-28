import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-ssmixtree',
  templateUrl: './ssmixtree.component.html',
  styleUrls: ['./ssmixtree.component.css']
})


export class SsmixtreeComponent implements OnInit {
  @ViewChild('tree') treeComponent: TreeComponent;
  public ssnodes: any[] = [{ name: 'root', children: [] }];
  public options = {};
  public files: UploadFile[] = [];
  public hl7text: string;
  private tree: TreeComponent;

  @Output() public selected = new EventEmitter();
  public viewhl7(contents): any {
    this.selected.emit(contents);
  }

  public setHL7Contents(node, text ) {
    node['contents'] = text;
  }

  private addNode(node: Object, array: string[]): any {
    for (let i = 0, length = array.length; i < length; i++) {
      if (node['children']) {
        let cni;
        const cn = node['children'].some((item, index) => {
          if (item.name === array[i]) {
            cni = index;
            return (true);
          }
        });
        if (cn) {
          node = node['children'][cni];
        } else {
          node['children'].push( { name: array[i], children: []});
          node = node['children'][node['children'].length - 1];
        }
      } else {
        node = node['children'] = [{ name: array[i] , children: []}];
      }
    }
//    this.tree.treeModel.update();
    return(node);
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      const fpaths: string[] = file.relativePath.split('/');
      const lnode: any = this.addNode(this.ssnodes[0], fpaths);
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file(
          hl7file => {
            const reader: FileReader = new FileReader();
            const comp = this;
            reader.onloadend = function(e)  {
              comp.setHL7Contents(lnode, this.result);
            };
          reader.readAsText(hl7file);
          });
      }
    }
  }

  constructor() {
    this.ssnodes = [{ name: 'root', children: [] }];
   }

  public update() {
    this.treeComponent.treeModel.update();
    console.log(this.ssnodes);
  }

  public ngOnInit() {
  }

}
