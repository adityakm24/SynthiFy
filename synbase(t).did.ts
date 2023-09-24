import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface Allowance {
  'allowance' : bigint,
  'expires_at' : [] | [bigint],
}
export interface AllowanceArgs { 'account' : Account, 'spender' : Account }
export interface ApproveArgs {
  'fee' : [] | [bigint],
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'amount' : bigint,
  'expected_allowance' : [] | [bigint],
  'expires_at' : [] | [bigint],
  'spender' : Account,
}
export type ApproveError = {
    'GenericError' : _InlineApproveErrorGenericError
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'Duplicate' : _InlineApproveErrorDuplicate } |
  { 'BadFee' : _InlineApproveErrorBadFee } |
  { 'AllowanceChanged' : _InlineApproveErrorAllowanceChanged } |
  { 'CreatedInFuture' : _InlineApproveErrorExpired } |
  { 'TooOld' : null } |
  { 'Expired' : _InlineApproveErrorExpired } |
  { 'InsufficientFunds' : _InlineApproveErrorInsufficientFunds };
export interface InitArgs {
  'fee' : bigint,
  'minting_account' : [] | [Account],
  'name' : string,
  'primary_account' : [] | [Account],
  'transaction_window_nanos' : bigint,
  'permitted_drift_nanos' : bigint,
  'decimal' : number,
  'symbol' : string,
}
export interface State {
  'fee' : bigint,
  'decimals' : number,
  'metadata' : Array<[string, Value]>,
  'minting_account' : [] | [Account],
  'name' : string,
  'primary_account' : [] | [Account],
  'transaction_window_nanos' : bigint,
  'transactions' : Array<Transaction>,
  'permitted_drift_nanos' : bigint,
  'supported_standards' : Array<SupportedStandard>,
  'total_supply' : bigint,
  'symbol' : string,
}
export interface SupportedStandard { 'url' : string, 'name' : string }
export interface Transaction {
  'fee' : bigint,
  'args' : _InlineTransactionArgs,
  'from' : [] | [Account],
  'kind' : TransactionKind,
  'timestamp' : bigint,
}
export type TransactionKind = { 'Approve' : null } |
  { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Transfer' : null } |
  { 'TransferFrom' : null };
export interface TransferArgs {
  'to' : Account,
  'fee' : [] | [bigint],
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'amount' : bigint,
}
export type TransferError = {
    'GenericError' : _InlineTransferErrorGenericError
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : _InlineTransferErrorBadBurn } |
  { 'Duplicate' : _InlineTransferErrorDuplicate } |
  { 'BadFee' : _InlineTransferErrorBadFee } |
  { 'CreatedInFuture' : _InlineTransferErrorCreatedInFuture } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : _InlineTransferErrorInsufficientFunds };
export interface TransferFromArgs {
  'to' : Account,
  'fee' : [] | [bigint],
  'spender_subaccount' : [] | [Uint8Array | number[]],
  'from' : Account,
  'memo' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'amount' : bigint,
}
export type TransferFromError = {
    'GenericError' : _InlineApproveErrorGenericError
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'InsufficientAllowance' : _InlineTransferFromErrorInsufficientAllowance } |
  { 'BadBurn' : _InlineTransferErrorBadBurn } |
  { 'Duplicate' : _InlineApproveErrorDuplicate } |
  { 'BadFee' : _InlineApproveErrorBadFee } |
  { 'CreatedInFuture' : _InlineApproveErrorExpired } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : _InlineApproveErrorInsufficientFunds };
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string };
export type _AzleResult = { 'Ok' : bigint } |
  { 'Err' : TransferError };
export type _AzleResult_1 = { 'Ok' : bigint } |
  { 'Err' : ApproveError };
export type _AzleResult_2 = { 'Ok' : bigint } |
  { 'Err' : TransferFromError };
export interface _InlineApproveErrorAllowanceChanged {
  'current_allowance' : bigint,
}
export interface _InlineApproveErrorBadFee { 'expected_fee' : bigint }
export interface _InlineApproveErrorDuplicate { 'duplicate_of' : bigint }
export interface _InlineApproveErrorExpired { 'ledger_time' : bigint }
export interface _InlineApproveErrorGenericError {
  'message' : string,
  'error_code' : bigint,
}
export interface _InlineApproveErrorInsufficientFunds { 'balance' : bigint }
export type _InlineTransactionArgs = { 'ApproveArgs' : ApproveArgs } |
  { 'TransferFromArgs' : TransferFromArgs } |
  { 'TransferArgs' : TransferArgs };
export interface _InlineTransferErrorBadBurn { 'min_burn_amount' : bigint }
export interface _InlineTransferErrorBadFee { 'expected_fee' : bigint }
export interface _InlineTransferErrorCreatedInFuture { 'ledger_time' : bigint }
export interface _InlineTransferErrorDuplicate { 'duplicate_of' : bigint }
export interface _InlineTransferErrorGenericError {
  'message' : string,
  'error_code' : bigint,
}
export interface _InlineTransferErrorInsufficientFunds { 'balance' : bigint }
export interface _InlineTransferFromErrorInsufficientAllowance {
  'allowance' : bigint,
}
export interface _SERVICE {
  'getCurrentState' : ActorMethod<[], State>,
  'icrc1_balance_of' : ActorMethod<[Account], bigint>,
  'icrc1_decimals' : ActorMethod<[], number>,
  'icrc1_fee' : ActorMethod<[], bigint>,
  'icrc1_metadata' : ActorMethod<[], Array<[string, Value]>>,
  'icrc1_minting_account' : ActorMethod<[], [] | [Account]>,
  'icrc1_name' : ActorMethod<[], string>,
  'icrc1_supported_standards' : ActorMethod<[], Array<SupportedStandard>>,
  'icrc1_symbol' : ActorMethod<[], string>,
  'icrc1_total_supply' : ActorMethod<[], bigint>,
  'icrc1_transfer' : ActorMethod<[TransferArgs], _AzleResult>,
  'icrc2_allowance' : ActorMethod<[AllowanceArgs], Allowance>,
  'icrc2_approve' : ActorMethod<[ApproveArgs], _AzleResult_1>,
  'icrc2_transfer_from' : ActorMethod<[TransferFromArgs], _AzleResult_2>,
  'testPadAccount' : ActorMethod<[[] | [Uint8Array | number[]]], Account>,
  'testingFee' : ActorMethod<[[] | [bigint]], boolean>,
  'updateMinterAccount' : ActorMethod<[Principal], string>,
  'updatePrimaryAccount' : ActorMethod<[Principal], string>,
}
