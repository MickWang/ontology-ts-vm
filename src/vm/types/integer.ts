import * as Long from 'long';
import { bigIntToBytes } from '../../common/utils';
import { Interop } from '../interfaces/interop';
import { StackItem } from './stackItem';

export class IntegerType implements StackItem {
  static id = 0x02;
  type: string;
  value: Long;

  constructor(value: Long) {
    this.value = value;
    this.type = 'IntegerType';
  }

  equals(other: StackItem): boolean {
    if (this === other) {
      return true;
    }
    if (other === undefined) {
      return false;
    }

    try {
      const v = other.getBigInteger();
      return this.value.eq(v);
    } catch (e) {
      const b = other.getByteArray();
      const tb = this.getByteArray();
      return b.equals(tb);
    }
  }

  getBigInteger() {
    return this.value;
  }

  getBoolean() {
    return this.value.neq(Long.ZERO);
  }

  getByteArray(): Buffer {
    return bigIntToBytes(this.value);
  }

  getInterface(): Interop {
    throw new Error('Not support integer to interface');
  }

  getArray(): StackItem[] {
    throw new Error('Not support integer to array');
  }

  getStruct(): StackItem[] {
    throw new Error('Not support integer to struct');
  }

  getMap(): Map<StackItem, StackItem> {
    throw new Error('Not support integer to map');
  }

  isMapKey(): boolean {
    return true;
  }
}

export function isIntegerType(item: StackItem): item is IntegerType {
  return item.type === 'IntegerType';
}
