export const idlFactory = ({ IDL }) => {
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
  const ManualReply_1 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferError });
  const IndividualVaultData = IDL.Record({
    'vaultLtvRatio' : IDL.Float64,
    'normalisedDebt' : IDL.Float64,
    'primaryOwner' : IDL.Principal,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'vaultCurrentCollateral' : IDL.Float64,
    'vaultCollaterisationRatio' : IDL.Float64,
    'isActive' : IDL.Bool,
    'VaultCreationTime' : IDL.Nat,
    'vaultId' : IDL.Nat,
  });
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
  const VaultStateData = IDL.Record({
    'DebtTokenPrincipal' : IDL.Principal,
    'priimary_owner' : IDL.Principal,
    'interestPerSecond' : IDL.Float64,
    'oracle' : IDL.Principal,
    'currentAccumulatorValue' : IDL.Float64,
    'lastAccumulatorUpdateTime_seconds' : IDL.Nat32,
    'CollateralPrincipal' : IDL.Principal,
    'interestFeePercentage' : IDL.Float64,
  });
  const VaultMetadata = IDL.Record({
    'DebtTokeName' : IDL.Text,
    'CollateralName' : IDL.Text,
  });
  const AdministrativeData = IDL.Record({
    'priimary_owner' : IDL.Principal,
    'guardians' : IDL.Vec(IDL.Principal),
  });
  const VaultStorageData = IDL.Record({
    'VaultStateData' : VaultStateData,
    'Transactions' : IDL.Vec(IndividualVaultData),
    'VaultMedata' : VaultMetadata,
    'vaultCounter' : IDL.Nat,
    'AdministrativeData' : AdministrativeData,
  });
  const _AzleResult = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const _InlineTransferFromErrorInsufficientAllowance = IDL.Record({
    'allowance' : IDL.Nat,
  });
  const TransferFromError = IDL.Variant({
    'GenericError' : _InlineTransferErrorGenericError,
    'TemporarilyUnavailable' : IDL.Null,
    'InsufficientAllowance' : _InlineTransferFromErrorInsufficientAllowance,
    'BadBurn' : _InlineTransferErrorBadBurn,
    'Duplicate' : _InlineTransferErrorDuplicate,
    'BadFee' : _InlineTransferErrorBadFee,
    'CreatedInFuture' : _InlineTransferErrorCreatedInFuture,
    'TooOld' : IDL.Null,
    'InsufficientFunds' : _InlineTransferErrorInsufficientFunds,
  });
  const ManualReply_2 = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : TransferFromError,
  });
  const ManualReply_3 = IDL.Variant({
    'Ok' : IDL.Float64,
    'Err' : TransferError,
  });
  return IDL.Service({
    'addCollateral' : IDL.Func([IDL.Nat, IDL.Nat], [ManualReply], []),
    'borrow' : IDL.Func([IDL.Nat, IDL.Nat], [ManualReply_1], []),
    'calculatenewAccumulator' : IDL.Func(
        [IDL.Float64, IDL.Float64, IDL.Nat32],
        [IDL.Float64],
        ['query'],
      ),
    'createVault' : IDL.Func([IDL.Opt(IDL.Vec(IDL.Nat8))], [IDL.Nat], []),
    'getBtcPrice' : IDL.Func([], [IDL.Text], []),
    'getUserVaultIds' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Nat)],
        ['query'],
      ),
    'getVaultActualDebt' : IDL.Func([IDL.Nat], [IDL.Float64], ['query']),
    'getVaultDetails' : IDL.Func([IDL.Nat], [IndividualVaultData], ['query']),
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
    'init' : IDL.Func([VaultStorageData], [_AzleResult], []),
    'normalizeDebt' : IDL.Func(
        [IDL.Float64, IDL.Float64],
        [IDL.Float64],
        ['query'],
      ),
    'repayDebt' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Opt(IDL.Vec(IDL.Nat8))],
        [ManualReply_2],
        [],
      ),
    'resetVault' : IDL.Func([], [IDL.Text], []),
    'testInit' : IDL.Func([], [_AzleResult], []),
    'testPadAccount' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Account],
        ['query'],
      ),
    'withdrawCollateral' : IDL.Func(
        [IDL.Nat, IDL.Nat, Account],
        [ManualReply_3],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
