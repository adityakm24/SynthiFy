export const idlFactory = ({ IDL }) => {
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Value = IDL.Variant({
    'Int' : IDL.Int,
    'Nat' : IDL.Nat,
    'Blob' : IDL.Vec(IDL.Nat8),
    'Text' : IDL.Text,
  });
  const SupportedStandard = IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text });
  const AllowanceArgs = IDL.Record({
    'account' : Account,
    'spender' : Account,
  });
  const Allowance = IDL.Record({
    'allowance' : IDL.Nat,
    'expires_at' : IDL.Opt(IDL.Nat64),
  });
  const _InlineICRCTransferErrorGenericError = IDL.Record({
    'message' : IDL.Text,
    'error_code' : IDL.Nat,
  });
  const _InlineICRCTransferErrorBadBurn = IDL.Record({
    'min_burn_amount' : IDL.Nat,
  });
  const _InlineICRCTransferErrorDuplicate = IDL.Record({
    'duplicate_of' : IDL.Nat,
  });
  const _InlineICRCTransferErrorBadFee = IDL.Record({
    'expected_fee' : IDL.Nat,
  });
  const _InlineICRCTransferErrorCreatedInFuture = IDL.Record({
    'ledger_time' : IDL.Nat64,
  });
  const _InlineICRCTransferErrorInsufficientFunds = IDL.Record({
    'balance' : IDL.Nat,
  });
  const ICRCTransferError = IDL.Variant({
    'GenericError' : _InlineICRCTransferErrorGenericError,
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : _InlineICRCTransferErrorBadBurn,
    'Duplicate' : _InlineICRCTransferErrorDuplicate,
    'BadFee' : _InlineICRCTransferErrorBadFee,
    'CreatedInFuture' : _InlineICRCTransferErrorCreatedInFuture,
    'TooOld' : IDL.Null,
    'InsufficientFunds' : _InlineICRCTransferErrorInsufficientFunds,
  });
  const ManualReply = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : ICRCTransferError,
  });
  const _InlineUtxoOutpoint = IDL.Record({
    'txid' : IDL.Vec(IDL.Nat8),
    'vout' : IDL.Nat32,
  });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : IDL.Nat64,
    'outpoint' : _InlineUtxoOutpoint,
  });
  const _InlineUtxoStatusMinted = IDL.Record({
    'minted_amount' : IDL.Nat64,
    'block_index' : IDL.Nat64,
    'utxo' : Utxo,
  });
  const UtxoStatus = IDL.Variant({
    'ValueTooSmall' : Utxo,
    'Tainted' : Utxo,
    'Minted' : _InlineUtxoStatusMinted,
    'Checked' : Utxo,
  });
  const _InlineUpdateBalanceErrorGenericError = IDL.Record({
    'error_message' : IDL.Text,
    'error_code' : IDL.Nat64,
  });
  const _InlineUpdateBalanceErrorNoNewUtxos = IDL.Record({
    'required_confirmations' : IDL.Nat32,
    'current_confirmations' : IDL.Opt(IDL.Nat32),
  });
  const UpdateBalanceError = IDL.Variant({
    'GenericError' : _InlineUpdateBalanceErrorGenericError,
    'TemporarilyUnavailable' : IDL.Text,
    'AlreadyProcessing' : IDL.Null,
    'NoNewUtxos' : _InlineUpdateBalanceErrorNoNewUtxos,
  });
  const ManualReply_1 = IDL.Variant({
    'Ok' : IDL.Vec(UtxoStatus),
    'Err' : UpdateBalanceError,
  });
  return IDL.Service({
    'getBalance' : IDL.Func([IDL.Principal], [IDL.Nat], []),
    'getBtcDepositAddress' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'getCaller' : IDL.Func([], [IDL.Principal], ['query']),
    'getTime' : IDL.Func([], [IDL.Nat], []),
    'getUint8array' : IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat8)], ['query']),
    'icrc1_balance_of' : IDL.Func([Account], [IDL.Nat], ['query']),
    'icrc1_decimals' : IDL.Func([], [IDL.Nat8], ['query']),
    'icrc1_fee' : IDL.Func([], [IDL.Nat], ['query']),
    'icrc1_metadata' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
        ['query'],
      ),
    'icrc1_minting_account' : IDL.Func([], [IDL.Opt(Account)], ['query']),
    'icrc1_name' : IDL.Func([], [IDL.Text], ['query']),
    'icrc1_supported_standards' : IDL.Func(
        [],
        [IDL.Vec(SupportedStandard)],
        ['query'],
      ),
    'icrc1_symbol' : IDL.Func([], [IDL.Text], ['query']),
    'icrc1_total_supply' : IDL.Func([], [IDL.Nat], ['query']),
    'icrc2_allowance' : IDL.Func([AllowanceArgs], [Allowance], ['query']),
    'testPadAccount' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Account],
        ['query'],
      ),
    'transferToVault' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Principal, IDL.Nat],
        [ManualReply],
        [],
      ),
    'updateBalance' : IDL.Func([IDL.Principal], [ManualReply_1], []),
    'updateVaultManagerAddress' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
