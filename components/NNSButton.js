// components/NNSButton.js

import React, { useState } from "react";

const NNSButton = () => {
  const [nnsStats, setNnsStats] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      // NNS Canister Id as an example
      const nnsCanisterId = "qoctq-giaaa-aaaaa-aaaea-cai";
      const whitelist = [nnsCanisterId];

      // Initialise Agent, expects no return value
      await window.ic.infinityWallet.requestConnect({
        whitelist,
      });

      // A partial Interface factory
      // for the NNS Canister UI
      const nnsPartialInterfaceFactory = ({ IDL }) => {
        const BlockHeight = IDL.Nat64;
        const Stats = IDL.Record({
          latest_transaction_block_height: BlockHeight,
          seconds_since_last_ledger_sync: IDL.Nat64,
          sub_accounts_count: IDL.Nat64,
          hardware_wallet_accounts_count: IDL.Nat64,
          accounts_count: IDL.Nat64,
          earliest_transaction_block_height: BlockHeight,
          transactions_count: IDL.Nat64,
          block_height_synced_up_to: IDL.Opt(IDL.Nat64),
          latest_transaction_timestamp_nanos: IDL.Nat64,
          earliest_transaction_timestamp_nanos: IDL.Nat64,
        });
        return IDL.Service({
          get_stats: IDL.Func([], [Stats], ["query"]),
        });
      };

      // Create an actor to interact with the NNS Canister
      // we pass the NNS Canister id and the interface factory
      const NNSUiActor = await window.ic.infinityWallet.createActor({
        canisterId: nnsCanisterId,
        interfaceFactory: nnsPartialInterfaceFactory,
        host: undefined, // set to http://localhost:8000/ to make calls to local DFX replica
      });

      // We can use any method described in the Candid (IDL)
      // for example the get_stats()
      const stats = await NNSUiActor.get_stats();
      setNnsStats(stats);
      console.log("NNS stats", stats);
    } catch (error) {
      setError(error);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Execute NNS Code</button>
      {nnsStats && (
        <div>
          <h2>NNS Stats</h2>
          <pre>{JSON.stringify(nnsStats, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NNSButton;
