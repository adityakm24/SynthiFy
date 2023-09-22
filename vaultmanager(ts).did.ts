import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface AdministrativeData {
  'priimary_owner' : Principal,
  'guardians' : Array<Principal>,
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
export interface IndividualVaultData {
  'vaultLtvRatio' : number,
  'normalisedDebt' : number,
  'primaryOwner' : Principal,
  'memo' : [] | [Uint8Array | number[]],
  'vaultCurrentCollateral' : number,
  'vaultCollaterisationRatio' : number,
  'isActive' : boolean,
  'VaultCreationTime' : bigint,
  'vaultId' : bigint,
}
export type ManualReply = { 'Ok' : bigint } |
  { 'Err' : ICRCTransferError };
export interface SupportedStandard { 'url' : string, 'name' : string }
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string };
export interface VaultMetadata {
  'DebtTokeName' : string,
  'CollateralName' : string,
}
export interface VaultStateData {
  'DebtTokenPrincipal' : Principal,
  'priimary_owner' : Principal,
  'interestPerSecond' : number,
  'oracle' : Principal,
  'currentAccumulatorValue' : number,
  'lastAccumulatorUpdateTime_seconds' : number,
  'CollateralPrincipal' : Principal,
  'interestFeePercentage' : number,
}
export interface VaultStorageData {
  'VaultStateData' : VaultStateData,
  'Transactions' : Array<IndividualVaultData>,
  'VaultMedata' : VaultMetadata,
  'vaultCounter' : bigint,
  'AdministrativeData' : AdministrativeData,
}
export type _AzleResult = { 'Ok' : string } |
  { 'Err' : string };
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
export interface vaultmanager_SERVICE {
  'addCollateral' : ActorMethod<[bigint, bigint], ManualReply>,
  'borrow' : ActorMethod<[bigint, bigint], bigint>,
  'calculatenewAccumulator' : ActorMethod<[number, number, number], number>,
  'createVault' : ActorMethod<[[] | [Uint8Array | number[]]], bigint>,
  'getBtcPrice' : ActorMethod<[], string>,
  'getUserVaultIds' : ActorMethod<[Principal], Array<bigint>>,
  'getVaultDetails' : ActorMethod<[bigint], IndividualVaultData>,
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
  'init' : ActorMethod<[VaultStorageData], _AzleResult>,
  'normalizeDebt' : ActorMethod<[number, number], number>,
  'repayDebt' : ActorMethod<
    [bigint, bigint, [] | [Uint8Array | number[]]],
    bigint
  >,
  'resetVault' : ActorMethod<[], string>,
  'testInit' : ActorMethod<[], _AzleResult>,
  'testPadAccount' : ActorMethod<[[] | [Uint8Array | number[]]], Account>,
  'withdrawCollateral' : ActorMethod<[bigint, bigint, Account], number>,
}
