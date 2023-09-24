//synBaseIdlFactory

export const synBaseIdlFactory  = ({ IDL }) => {
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const InitArgs = IDL.Record({
    'fee' : IDL.Nat,
    'minting_account' : IDL.Opt(Account),
    'name' : IDL.Text,
    'primary_account' : IDL.Opt(Account),
    'transaction_window_nanos' : IDL.Nat64,
    'permitted_drift_nanos' : IDL.Nat64,
    'decimal' : IDL.Nat8,
    'symbol' : IDL.Text,
  });
  const Value = IDL.Variant({
    'Int' : IDL.Int,
    'Nat' : IDL.Nat,
    'Blob' : IDL.Vec(IDL.Nat8),
    'Text' : IDL.Text,
  });
  const ApproveArgs = IDL.Record({
    'fee' : IDL.Opt(IDL.Nat),
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat),
    'amount' : IDL.Nat,
    'expected_allowance' : IDL.Opt(IDL.Nat),
    'expires_at' : IDL.Opt(IDL.Nat64),
    'spender' : Account,
  });
  const TransferFromArgs = IDL.Record({
    'to' : Account,
    'fee' : IDL.Opt(IDL.Nat),
    'spender_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from' : Account,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'amount' : IDL.Nat,
  });
  const TransferArgs = IDL.Record({
    'to' : Account,
    'fee' : IDL.Opt(IDL.Nat),
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'amount' : IDL.Nat,
  });
  const _InlineTransactionArgs = IDL.Variant({
    'ApproveArgs' : ApproveArgs,
    'TransferFromArgs' : TransferFromArgs,
    'TransferArgs' : TransferArgs,
  });
  const TransactionKind = IDL.Variant({
    'Approve' : IDL.Null,
    'Burn' : IDL.Null,
    'Mint' : IDL.Null,
    'Transfer' : IDL.Null,
    'TransferFrom' : IDL.Null,
  });
  const Transaction = IDL.Record({
    'fee' : IDL.Nat,
    'args' : _InlineTransactionArgs,
    'from' : IDL.Opt(Account),
    'kind' : TransactionKind,
    'timestamp' : IDL.Nat64,
  });
  const SupportedStandard = IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text });
  const State = IDL.Record({
    'fee' : IDL.Nat,
    'decimals' : IDL.Nat8,
    'metadata' : IDL.Vec(IDL.Tuple(IDL.Text, Value)),
    'minting_account' : IDL.Opt(Account),
    'name' : IDL.Text,
    'primary_account' : IDL.Opt(Account),
    'transaction_window_nanos' : IDL.Nat64,
    'transactions' : IDL.Vec(Transaction),
    'permitted_drift_nanos' : IDL.Nat64,
    'supported_standards' : IDL.Vec(SupportedStandard),
    'total_supply' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  const _InlineTransferErrorGenericError = IDL.Record({
    'message' : IDL.Text,
    'error_code' : IDL.Nat,
  });
  const _InlineTransferErrorBadBurn = IDL.Record({
    'min_burn_amount' : IDL.Nat,
  });
  const _InlineTransferErrorDuplicate = IDL.Record({
    'duplicate_of' : IDL.Nat,
  });
  const _InlineTransferErrorBadFee = IDL.Record({ 'expected_fee' : IDL.Nat });
  const _InlineTransferErrorCreatedInFuture = IDL.Record({
    'ledger_time' : IDL.Nat64,
  });
  const _InlineTransferErrorInsufficientFunds = IDL.Record({
    'balance' : IDL.Nat,
  });
  const TransferError = IDL.Variant({
    'GenericError' : _InlineTransferErrorGenericError,
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : _InlineTransferErrorBadBurn,
    'Duplicate' : _InlineTransferErrorDuplicate,
    'BadFee' : _InlineTransferErrorBadFee,
    'CreatedInFuture' : _InlineTransferErrorCreatedInFuture,
    'TooOld' : IDL.Null,
    'InsufficientFunds' : _InlineTransferErrorInsufficientFunds,
  });
  const _AzleResult = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferError });
  const AllowanceArgs = IDL.Record({
    'account' : Account,
    'spender' : Account,
  });
  const Allowance = IDL.Record({
    'allowance' : IDL.Nat,
    'expires_at' : IDL.Opt(IDL.Nat64),
  });
  const _InlineApproveErrorGenericError = IDL.Record({
    'message' : IDL.Text,
    'error_code' : IDL.Nat,
  });
  const _InlineApproveErrorDuplicate = IDL.Record({ 'duplicate_of' : IDL.Nat });
  const _InlineApproveErrorBadFee = IDL.Record({ 'expected_fee' : IDL.Nat });
  const _InlineApproveErrorAllowanceChanged = IDL.Record({
    'current_allowance' : IDL.Nat,
  });
  const _InlineApproveErrorExpired = IDL.Record({ 'ledger_time' : IDL.Nat64 });
  const _InlineApproveErrorInsufficientFunds = IDL.Record({
    'balance' : IDL.Nat,
  });
  const ApproveError = IDL.Variant({
    'GenericError' : _InlineApproveErrorGenericError,
    'TemporarilyUnavailable' : IDL.Null,
    'Duplicate' : _InlineApproveErrorDuplicate,
    'BadFee' : _InlineApproveErrorBadFee,
    'AllowanceChanged' : _InlineApproveErrorAllowanceChanged,
    'CreatedInFuture' : _InlineApproveErrorExpired,
    'TooOld' : IDL.Null,
    'Expired' : _InlineApproveErrorExpired,
    'InsufficientFunds' : _InlineApproveErrorInsufficientFunds,
  });
  const _AzleResult_1 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : ApproveError });
  const _InlineTransferFromErrorInsufficientAllowance = IDL.Record({
    'allowance' : IDL.Nat,
  });
  const TransferFromError = IDL.Variant({
    'GenericError' : _InlineApproveErrorGenericError,
    'TemporarilyUnavailable' : IDL.Null,
    'InsufficientAllowance' : _InlineTransferFromErrorInsufficientAllowance,
    'BadBurn' : _InlineTransferErrorBadBurn,
    'Duplicate' : _InlineApproveErrorDuplicate,
    'BadFee' : _InlineApproveErrorBadFee,
    'CreatedInFuture' : _InlineApproveErrorExpired,
    'TooOld' : IDL.Null,
    'InsufficientFunds' : _InlineApproveErrorInsufficientFunds,
  });
  const _AzleResult_2 = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : TransferFromError,
  });
  return IDL.Service({
    'getCurrentState' : IDL.Func([], [State], ['query']),
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
    'icrc1_transfer' : IDL.Func([TransferArgs], [_AzleResult], []),
    'icrc2_allowance' : IDL.Func([AllowanceArgs], [Allowance], ['query']),
    'icrc2_approve' : IDL.Func([ApproveArgs], [_AzleResult_1], []),
    'icrc2_transfer_from' : IDL.Func([TransferFromArgs], [_AzleResult_2], []),
    'testPadAccount' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Account],
        ['query'],
      ),
    'testingFee' : IDL.Func([IDL.Opt(IDL.Nat)], [IDL.Bool], ['query']),
    'updateMinterAccount' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'updatePrimaryAccount' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => {
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const InitArgs = IDL.Record({
    'fee' : IDL.Nat,
    'minting_account' : IDL.Opt(Account),
    'name' : IDL.Text,
    'primary_account' : IDL.Opt(Account),
    'transaction_window_nanos' : IDL.Nat64,
    'permitted_drift_nanos' : IDL.Nat64,
    'decimal' : IDL.Nat8,
    'symbol' : IDL.Text,
  });
  return [InitArgs];
};
