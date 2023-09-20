export const vaultManageridlFactory = ({ IDL }) => {
  const ManualReply = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
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
  return IDL.Service({
    'addCollateral' : IDL.Func([IDL.Nat, IDL.Nat], [ManualReply], []),
    'borrow' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'calculatenewAccumulator' : IDL.Func(
        [IDL.Float64, IDL.Float64, IDL.Nat32],
        [IDL.Float64],
        ['query'],
      ),
    'createVault' : IDL.Func([IDL.Opt(IDL.Vec(IDL.Nat8))], [IDL.Nat], []),
    'getBtcPrice' : IDL.Func([], [IDL.Text], []),
    'getVaultDetails' : IDL.Func([IDL.Nat], [IndividualVaultData], ['query']),
    'icrc1_balance_of' : IDL.Func([Account], [IDL.Nat], ['query']),
    'icrc1_decimals' : IDL.Func([], [IDL.Nat], ['query']),
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
        [IDL.Nat],
        [],
      ),
    'testInit' : IDL.Func([], [_AzleResult], []),
    'withdrawCollateral' : IDL.Func(
        [IDL.Nat, IDL.Nat, Account],
        [IDL.Float64],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
