//@todo: reset btcDepositAddress on page reload or if its not default value

import styles from "../assets/styles/Withdraw.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { encodeIcrcAccount } from "@dfinity/ledger";
import { Principal } from "@dfinity/principal";
import { idlFactory as depositIdlFactory } from "../deposit.did";
import { idlFactory as vaultManageridlFactory } from "../vaultmanager.did.js";
import { _SERVICE as DepositModule } from "../deposit.did(t)";
import { _SERVICE as vaultmanager_SERVICE } from "../vaultmanager(ts).did";
import { Account } from "@/synbase(t).did";
import Head from "next/head";

const Withdraw = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen0, setIsModalOpen0] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [assets, setAssets] = useState([]);
  const [connectPrincipal, setConnectedPrincipal] = useState<Principal | null>(
    null
  );
  const [encodedAccount, setEncodedAccount] = useState("");
  const [vaultID, setvaultID] = useState("");
  const [address, setaddress] = useState("");
  const [amount, setamount] = useState("");

  const [depositModule, setDepositModule] = useState<DepositModule | null>(
    null
  );
  const [vaultManager, setVaultManager] = useState<vaultmanager_SERVICE | null>(
    null
  );

  const [btcDepositAddress, setbtcDepositAddress] = useState<string>(
    "Click Get  Deposit Address"
  );
  const [loadingDepositAddress, setLoadingDepositAddress] = useState(false);

  const [currentUserBalance, setUserBalance] = useState<string | null>(null);

  const router = useRouter();
  const depositModuleAddress = "ivtqt-gqaaa-aaaal-qcdra-cai";
  const vaultManagerAddress = "isswh-liaaa-aaaal-qcdrq-cai";

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const result = await window.ic.infinityWallet.isConnected();
        const userAssets = await window.ic.infinityWallet.getUserAssets();
        console.log(`User's list of tokens/assets`, assets);
        setIsConnected(result);
        setAssets(userAssets); 

        if (result) {
          const publicKey: Principal =
            await window.ic.infinityWallet.getPrincipal();
          setConnectedPrincipal(publicKey);
          const address = publicKey.toText();
          setConnectedAddress(address);
          setEncodedAccount(
            encodeIcrcAccount({
              owner: Principal.fromText(depositModuleAddress),
              subaccount: padPrincipalWithZeros(publicKey.toUint8Array()),
            })
          );
          await DepositModulecreateActor();
          await VaultManagercreateActor();
        }
        else{
          router.push('/connectwallet')
        }
      } catch (e) {
        console.log("Error checking wallet connection:", e);
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    const main = async () => {
      if (depositModule !== null && connectPrincipal !== null) {
        const balance = await depositModule.getBalance(connectPrincipal);
        const decimalAdjustBalance = adjustDecimals(balance);
        setUserBalance(decimalAdjustBalance.toString());
      }
    };

    main();
  });

  const toggleModal1 = () => {
    setbtcDepositAddress("Click Get Deposit Address");
    setIsModalOpen1(!isModalOpen1);
  };

  const toggleModal0 = () => {
    setIsModalOpen0(!isModalOpen0);
  };

  const DepositModulecreateActor = async () => {
    try {
      const depositModule = await window.ic.infinityWallet.createActor({
        canisterId: depositModuleAddress,
        interfaceFactory: depositIdlFactory,
        host: undefined,
      });

      setDepositModule(depositModule);
    } catch (e) {
      console.log("Error creating actor:", e);
    }
  };
  function adjustDecimals(amount: bigint) {
    const decimals = BigInt(Math.pow(10, 8));

    return Number((amount * decimals) / decimals) / 100000000;
  }
  const handleGetDepositAddress = async () => {
    if (depositModule !== null && connectPrincipal !== null) {
      try {
        setLoadingDepositAddress(true);
        const address = await depositModule.getBtcDepositAddress(
          connectPrincipal
        );
        setbtcDepositAddress(address);
      } catch (e) {
        console.error("Error getting deposit address:", e);
        setbtcDepositAddress("Error getting address");
      } finally {
        setLoadingDepositAddress(false);
      }
    }
  };

  const handleUpdateBtcBalance = async () => {
    if (depositModule !== null && connectPrincipal != null) {
      try {
        setLoadingDepositAddress(true);
        const updateResult = await depositModule.updateBalance(
          connectPrincipal
        );
        if ("Err" in updateResult) {
          setbtcDepositAddress("Error updating balance ");
          console.log(updateResult);
        } else {
          setbtcDepositAddress("Btc balance updated");
        }
      } catch (e) {
        console.error("Erro updating balance ", e);
        setbtcDepositAddress("Error updating balance ");
      } finally {
        setLoadingDepositAddress(false);
      }
    }
  };
  const VaultManagercreateActor = async () => {
    try {
      const vaultManager = await window.ic.infinityWallet.createActor({
        canisterId: vaultManagerAddress,
        interfaceFactory: vaultManageridlFactory,
        host: undefined,
      });

      setVaultManager(vaultManager);
    } catch (e) {
      console.log("Error creating actor:", e);
    }
  };

  const padPrincipalWithZeros = (blob: Uint8Array) => {
    let newUin8Array = new Uint8Array(32);
    newUin8Array.set(blob);
    return newUin8Array;
  };

  const copyAddress = () => {
    if (connectedAddress) {
      navigator.clipboard
        .writeText(connectedAddress)
        .then(() => {
          alert("Address copied to clipboard");
        })
        .catch((error) => {
          console.error("Error copying address to clipboard:", error);
        });
    }
  };
  const validateFields1 = () => {
    if (vaultID === "" || address === "" || amount === "") {
      alert("Please fill in all required fields");
      return false;
    }
    if (parseInt(amount) < 0) {
      alert("Amount should not be negative");
      return false;
    }
    return true;
  };

  //@major issue use is able to enter any text in address field

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFields1()) {
      // Handle form submission logic here
      // You can make an API call or perform any other action

      if (vaultManager !== null) {
        try {
          const _vauldId = BigInt(parseInt(vaultID));
          const parsedValue = parseFloat(amount);
          const amountToWithdraw =
            (BigInt(Math.pow(10, 8)) * BigInt(Math.round(parsedValue * 10))) /
            BigInt(10);
          const toAccount: Account = {
            owner: Principal.fromText(address),
            subaccount: [],
          };

          console.log(
            await vaultManager.withdrawCollateral(
              _vauldId,
              amountToWithdraw,
              toAccount
            )
          );
        } catch (e) {
          console.log("Error occured:", e);
        }
      }
    }
  };

  const updateBalance = () => {
    //add animation for loading balance
  };

  const handleVaultIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Check if the input is a positive integer
    if (/^[0-9]\d*$/.test(inputValue)) {
      setvaultID(inputValue);
    } else {
      // If not a positive integer, you can display an error message or handle it in another way
      // For now, we clear the input
      setvaultID("");
    }
  };

  return (
    <div className={styles.body}>
      <Head>
        <title>SynthiFy Finance - Manage Profile and Withdraw Assets</title>
        <meta
          name="description"
          content="SynthiFy Finance allows you to unlock liquidity by borrowing against your ckbtc holdings. Access stablecoins instantly and maximize your crypto assets. Join the future of decentralized finance today!"
        />
        <meta
          name="keywords"
          content="SynthiFy Finance, SynthiFy App, synthify, synthify app, synthify finance, synthify twitter, Decentralized finance platform, Crypto lending and borrowing, Collateralized loans, Synth tokens, Stablecoin minting, Instant liquidity, Yield farming, Smart contracts, Financial decentralization, Crypto-backed loans, Cryptocurrency protocol, Decentralized liquidity pool, SynthUSD stablecoin, Blockchain assets, Peer-to-peer lending, Yield optimization, DeFi ecosystem, Blockchain technology, Liquidity protocol, Asset-backed loans, Tokenized assets, Yield generation, Crypto investment, Digital currency, Yield farming strategies, DeFi governance, Crypto staking, Crypto portfolio management, Yield farming rewards, Crypto savings accounts, DeFi lending platforms, Yield farming liquidity, Crypto-backed stablecoins, Yield farming risks, Blockchain-based finance, DeFi tokenized assets, Yield farming projects, Automated finance, Crypto liquidity solutions, Liquidity mining, DeFi tokens, Tokenization of assets, Decentralized savings, Decentralized exchange, Synthetic assets, Crypto yield farming, Yield farming platforms, Crypto asset management, Crypto yield optimization, DeFi lending protocols, Crypto finance solutions, DeFi borrowing and lending, Blockchain investment strategies, Yield farming opportunities, DeFi portfolio diversification, DeFi governance tokens, Decentralized finance apps, Crypto investment vehicles, Decentralized lending platforms, Blockchain collateralization, Yield farming strategies and risks, Crypto loan collateral, DeFi liquidity providers, Crypto yield pools, Crypto trading and investment, Decentralized asset management, Cryptocurrency yield farming, Blockchain lending platforms, Crypto yield generation, Crypto portfolio optimization, DeFi asset-backed loans, Decentralized lending and borrowing, Stablecoin creation, Crypto asset diversification, Yield farming security, Blockchain-based savings, Crypto-backed loan collateral, Yield farming projects and rewards, SynthiFy Finance updates"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icons/tabicon.jpg" />{" "}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="SynthiFy Finance - Unlock Liquidity with ckbtc Holdings"
        />
        <meta
          name="twitter:description"
          content="Unlock liquidity with SynthiFy Finance and maximize your crypto assets. Join the future of decentralized finance!"
        />
        <meta
          name="twitter:image"
          content="https://pbs.twimg.com/profile_images/1714692668796923904/n9qKs6od_400x400.jpg"
        />
        <meta name="twitter:site" content="@SynthiFyFinance" />
        <meta name="twitter:creator" content="@SynthiFyFinance" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SynthiFy Finance - Unlock Liquidity with ckbtc Holdings"
        />
        <meta
          property="og:description"
          content="Unlock liquidity with SynthiFy Finance and maximize your crypto assets. Join the future of decentralized finance!"
        />
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_images/1714692668796923904/n9qKs6od_400x400.jpg"
        />
        <meta property="og:url" content="https://synthifyapp.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SynthiFy Finance - Unlock Liquidity with ckbtc Holdings"
        />
        <meta
          property="og:description"
          content="Unlock liquidity with SynthiFy Finance and maximize your crypto assets. Join the future of decentralized finance!"
        />
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_images/1714692668796923904/n9qKs6od_400x400.jpg"
        />
        <meta property="og:url" content="https://synthifyapp.com/" />
      </Head>
      <div className={styles.blob}></div>
      {isConnected ? (
        <div
          style={{
            width: "100%",
            margin: "0 auto 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div className={styles.formContainer}>
            <h1>Withdraw [ckBTC]</h1>
            <h4>
              Current Deposited Balance In Module:{" "}
              {currentUserBalance ?? "loading"} CKBTC
            </h4>
            <form onSubmit={handleWithdraw}>
              <input
                type="number"
                name="VaultID"
                id="VaultID"
                className={styles.formInput}
                value={vaultID}
                onChange={handleVaultIDChange}
                placeholder="Enter VaultID"
              />
              <input
                type="text"
                name="address"
                id="address"
                className={styles.formInput}
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter address"
              />
              <input
                type="number"
                name="amount"
                id="amount"
                className={styles.formInput}
                value={amount}
                onChange={(e) => setamount(e.target.value)}
                placeholder="Enter amount"
              />
              <button type="submit" className={styles.formButton}>
                Submit
              </button>
            </form>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.formButton2} onClick={toggleModal0}>
              Withdraw CkBTC
            </button>

            {isModalOpen0 && (
              <div className={styles.modalBackdrop}>
                <div className={styles.modalContent}>
                  <i
                    className={`fa fa-times-circle ${styles.closeIcon}`}
                    onClick={toggleModal0}
                  ></i>
                  <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                      <p>Deposit your ckbtc to the below address.</p>
                      <h3>{encodedAccount}</h3>
                    </div>
                  </div>

                  <div className={styles.modalActions}>
                    <button className={styles.general2}>Update Deposits</button>
                  </div>
                </div>
              </div>
            )}

            <button className={styles.formButton2} onClick={toggleModal1}>
              Withdraw BTC
            </button>
            {isModalOpen1 && (
              <div className={styles.modalBackdrop}>
                <div className={styles.modalContent}>
                  <i
                    className={`fa fa-times-circle ${styles.closeIcon}`}
                    onClick={toggleModal1}
                  ></i>
                  <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                      <h3>
                        {loadingDepositAddress
                          ? "Loading..."
                          : btcDepositAddress}
                      </h3>
                      <br></br>
                      <br></br>
                    </div>

                    <div className={styles.modalActions}>
                      <button
                        className={styles.general2}
                        onClick={handleGetDepositAddress}
                      >
                        Get Deposit Address
                      </button>
                      <br></br>
                      <button
                        className={styles.general2}
                        onClick={handleUpdateBtcBalance}
                      >
                        Update Deposit Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
