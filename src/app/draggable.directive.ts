import { Directive, OnInit, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  @Input() data: string;

  // tslint:disable-next-line:variable-name
  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    // Get the current element
    const el = this._elementRef.nativeElement;

    // Set the draggable attribute to the element
    el.draggable = 'true';

    // Set up the dragstart event and add the drag-src CSS class
    // to change the visual appearance. Set the current todo as the data
    // payload by stringifying the object first
    el.addEventListener('dragstart', (e) => {
      el.classList.add('drag-src');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('item', el.getAttribute('hl7-iri'));
    });

    // Remove the drag-src class
    el.addEventListener('dragend', (e) => {
      e.preventDefault();
      el.classList.remove('drag-src');
    });
  }
}
