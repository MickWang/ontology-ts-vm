import { Address } from '../common/address';

// NotifyEventInfo describe smart contract event notify info struct
export interface NotifyEventInfo {
  contractAddress: Address;
  states: any;
}
