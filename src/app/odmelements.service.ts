import { Injectable, QueryList } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class OdmelementsService {
  public elements;
  public elementsStr;

  public setElements(directives: QueryList<CdkDropList>) {
    this.elements = new Array;
    directives.forEach((d) =>
      this.elements.push(d.element.nativeElement.id));
    this.elementsStr = this.elements.join(',');
    console.log(this.elementsStr);
  }

  constructor() {
   }
}
