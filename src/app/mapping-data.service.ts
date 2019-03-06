import { Injectable } from '@angular/core';

declare var require: any;
const rdf = require('rdf');

@Injectable({
  providedIn: 'root',
})

export class MappingDataService {
  private store;

  getHL7BlankNode(odmNode) {
    console.log('getHL7BlankNode:' + odmNode);
    for (const triple of this.store.toArray()) {
      if (triple.subject.equals(odmNode) && triple.predicate.equals('http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#copyfrom')) {
        return(triple.object);
      }
    }
    return(null);
  }

  getConditionValue(odmNode) {
    const hl7node = this.getHL7BlankNode(odmNode);
    if (hl7node != null) {
      for (const triple of this.store.toArray()) {
        if (triple.subject.equals(hl7node) && triple.predicate.equals('http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#condition')) {
          const conditionNode = triple.object;
          for (const t2 of this.store.toArray() ) {
            if (t2.subject.equals(conditionNode) && t2.predicate.equals('http://www.umin.ac.jp/cdisc/mapping/2019/03/ssmix2#value')) {
              return(t2.object);
            }
          }
        }
      }
    }
    return(null);
  }

  add(triple) {
    this.store.add(triple);
  }

  constructor() {
    this.store = rdf.environment.createGraph();
  }

  output() {
    let serialized = '';
    this.store.forEach((triple) => {
      serialized = serialized + triple.toNT() + '\n';
    });
    console.log('Serialized Mapping: ' + serialized);
    return(serialized);
  }
}

