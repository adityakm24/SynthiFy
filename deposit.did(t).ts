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
export type ICRCTransferError = {
    'GenericError' : _InlineICRCTransferErrorGenericError
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : _InlineICRCTransferErrorBadBurn } |
  { 'Duplicate' : _InlineICRCTransferErrorDuplicate } |
  { 'BadFee' : _InlineICRCTransferErrorBadFee } |
  { 'CreatedInFuture' : _InlineICRCTransferErrorCreatedInFuture } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : _InlineICRCTransferErrorInsufficientFunds };
export type ManualReply = { 'Ok' : bigint } |
  { 'Err' : ICRCTransferError };
export type ManualReply_1 = { 'Ok' : bigint } |
  { 'Err' : ICRCTransferError };
export type ManualReply_2 = { 'Ok' : Array<UtxoStatus> } |
  { 'Err' : UpdateBalanceError };
export interface SupportedStandard { 'url' : string, 'name' : string }
export type UpdateBalanceError = {
    'GenericError' : _InlineUpdateBalanceErrorGenericError
  } |
  { 'TemporarilyUnavailable' : string } |
  { 'AlreadyProcessing' : null } |
  { 'NoNewUtxos' : _InlineUpdateBalanceErrorNoNewUtxos };
export interface Utxo {
  'height' : number,
  'value' : bigint,
  'outpoint' : _InlineUtxoOutpoint,
}
export type UtxoStatus = { 'ValueTooSmall' : Utxo } |
  { 'Tainted' : Utxo } |
  { 'Minted' : _InlineUtxoStatusMinted } |
  { 'Checked' : Utxo };
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string };
export interface _InlineICRCTransferErrorBadBurn { 'min_burn_amount' : bigint }
export interface _InlineICRCTransferErrorBadFee { 'expected_fee' : bigint }
export interface _InlineICRCTransferErrorCreatedInFuture {
  'ledger_time' : bigint,
}
export interface _InlineICRCTransferErrorDuplicate { 'duplicate_of' : bigint }
export interface _InlineICRCTransferErrorGenericError {
  'message' : string,
  'error_code' : bigint,
}
export interface _InlineICRCTransferErrorInsufficientFunds {
  'balance' : bigint,
}
export interface _InlineUpdateBalanceErrorGenericError {
  'error_message' : string,
  'error_code' : bigint,
}
export interface _InlineUpdateBalanceErrorNoNewUtxos {
  'required_confirmations' : number,
  'current_confirmations' : [] | [number],
}
export interface _InlineUtxoOutpoint {
  'txid' : Uint8Array | number[],
  'vout' : number,
}
export interface _InlineUtxoStatusMinted {
  'minted_amount' : bigint,
  'block_index' : bigint,
  'utxo' : Utxo,
}
export interface _SERVICE {
  'getBalance' : ActorMethod<[Principal], bigint>,
  'getBtcDepositAddress' : ActorMethod<[], string>,
  'getCaller' : ActorMethod<[], Principal>,
  'getTime' : ActorMethod<[], bigint>,
  'getUint8array' : ActorMethod<[Principal], Uint8Array | number[]>,
  'icrc1_balance_of' : ActorMethod<[Account], bigint>,
  'icrc1_decimals' : ActorMethod<[], number>,
  'icrc1_fee' : ActorMethod<[], bigint>,
  'icrc1_metadata' : ActorMethod<[], Array<[string, Value]>>,
  'icrc1_minting_account' : ActorMethod<[], [] | [Account]>,
  'icrc1_name' : ActorMethod<[], string>,
  'icrc1_supported_standards' : ActorMethod<[], Array<SupportedStandard>>,
  'icrc1_symbol' : ActorMethod<[], string>,
  'icrc1_total_supply' : ActorMethod<[], bigint>,
  'icrc2_allowance' : ActorMethod<[AllowanceArgs], Allowance>,
  'mintTokens' : ActorMethod<[Account, bigint], ManualReply>,
  'testPadAccount' : ActorMethod<[[] | [Uint8Array | number[]]], Account>,
  'transfer' : ActorMethod<[Account, bigint], ManualReply_1>,
  'transferToVault' : ActorMethod<
    [Principal, bigint, Principal, bigint],
    ManualReply_1
  >,
  'updateBalance' : ActorMethod<[], ManualReply_2>,
  'updateVaultManagerAddress' : ActorMethod<[Principal], string>,
}
