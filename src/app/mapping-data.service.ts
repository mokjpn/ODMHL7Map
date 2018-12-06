import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MappingDataService {

  constructor() { }

}

export class Predicate {
  public static dict  = {
    'pred-copy': 'Copy',
    'pred-composition': 'Composition'
  };
  private valuekey: string;
  public getPredicateString() {
    return (Predicate.dict[this.valuekey]);
  }
  public getPredicateURI() {
    return (Mapping.namespace + this.valuekey);
  }
  public setPredicate(key: string) {
    if (key in Predicate.dict) {
      this.valuekey = key;
    } else {
      throw new Error('Invalid value of predicate');
    }
  }
}

// SPARQL Query terminology can be used to discribe detailed logical condition.
export class Condition {
  public static dict = {
    'cond-equal': 'Equal',
    'cond-notequal': 'Not Equal',
    'cond-lessthan': 'Less Than',
    'cond-lessthanequal': 'Less Than or Equal',
    'cond-morethan': 'More Than',
    'cond-morethanequal': 'More Than or Equal',
    'cond-sparql': 'Specify SPARQL'
  };
  private valuekey: string;
  public getConditionString() {
    return (Condition.dict[this.valuekey]);
  }
  public getConditionURI() {
    return (Mapping.namespace + this.valuekey);
  }
  public setCondition(key: string) {
    if (key in Condition.dict) {
      this.valuekey = key;
    } else {
      throw new Error('Invalid value of Condition');
    }
  }
}

export class Timing {
  public static dict = {
    'timing-same': 'From Same Visit',
    'timing-multiple': 'From Multple Visits'
  };
  private valuekey: string;
  public getTimingString() {
    return (Timing.dict[this.valuekey]);
  }
  public getTimingURI() {
    return (Mapping.namespace + this.valuekey);
  }
  public setTiming(key: string) {
    if (key in Timing.dict) {
      this.valuekey = key;
    } else {
      throw new Error('Invalid value of Timing');
    }
  }
}

export class Caluculation {
  public static dict = {
    'calc-count': 'Count filled',
    'calc-mean': 'Mean',
    'calc-median': 'Median',
    'calc-max': 'Maximum',
    'calc-min': 'Minimum',
    'calc-sum': 'Sum',
    'calc-r': 'Specify Method by R language'
  };
}

export class Mapping {
  public static namespace = 'http://www.umin.ac.jp/ssmixcdisc/2019/Mapping#';
  public subject: string;
  public predicate: Predicate;
  public object: string;
  public id: string;
  public uri() {
    return(this.id);
  }
}
