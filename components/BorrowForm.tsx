import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../assets/styles/Borrow.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Opt } from "azle";
import { Principal } from "@dfinity/principal";

import { idlFactory as vaultManageridlFactory } from "../vaultmanager.did.js";
import { synBaseIdlFactory } from "../synBase.did";
import {
  _SERVICE as vaultmanager_SERVICE,
  IndividualVaultData,
  AllowanceArgs,
} from "@/vaultmanager(ts).did";
import { _SERVICE as synBase_SERVICE } from "@/synbase(t).did";

import { Account } from "@/vaultmanager(ts).did";
import { Allowance } from "@/vaultmanager(ts).did";
import { ApproveArgs } from "@/synbase(t).did";

const Borrow = () => {
  const [vaultID, setVaultID] = useState("");
  const [synthUsdAmount, setsynthUsdAmount] = useState("");
  const [collatAmnt, setcollatAmnt] = useState("");
  const [ckBtcAmount, setckBtcAmount] = useState("");
  const [Currency, setCurrency] = useState("sUSD");
  const [selectedPill, setSelectedPill] = useState("");
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Borrow");
  const [backendData, setBackendData] = useState("");
  const [vaultManager, setVaultManager] = useState<vaultmanager_SERVICE | null>(
    null
  );
  const [currentVautDetails, setCurrentVaultDetails] =
    useState<IndividualVaultData | null>(null);
  const [connectPrincipal, setConnectedPrincipal] = useState<Principal | null>(
    null
  );
  const [currentVaultIds, setCurrentVaultIds] = useState<Array<bigint>>([]);
  const [Allowance, setAllowance] = useState<Allowance | null>(null);
  const [synBaseAddress, setSynBaseAddress] = useState<synBase_SERVICE | null>(
    null
  );
  const [debtToRepay, setDebtToRepay] = useState("");

  const [actualUserDebt, setActualUserDebt] = useState<number | null>();

  const vaultManagerAddress = "isswh-liaaa-aaaal-qcdrq-cai";

  const synthTokenAddress = "i3r53-5aaaa-aaaal-qcdqa-cai";

  const synthMinterAddress = "i4q3p-qyaaa-aaaal-qcdqq-cai";

  const whitelist = [
    vaultManagerAddress,
    synthTokenAddress,
    synthMinterAddress,
  ];

  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const result = await window.ic.infinityWallet.isConnected();
        setIsConnected(result);

        if (result) {
          const publicKey = await window.ic.infinityWallet.getPrincipal();
          setConnectedPrincipal(publicKey);
          const address = publicKey.toText();
          setConnectedAddress(address);
          await VaultManagercreateActor();
          await SyntheTokenCreateActor();
          //
          console.log(`The connected user's public key  sis:`, publicKey);
        }
      } catch (e) {
        console.log("Error checking wallet connection:", e);
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    // Call getuserIdVaults whenever selectedOption changes to "Create Vault"
    if (selectedOption === "Create Vault" && vaultManager !== null) {
      getuserIdVaults();
    }
  }, [selectedOption, vaultManager]);

  //@todo: Change the use effect condition
  useEffect(() => {
    console.log("inside use effect");
    const main = async () => {
      await checkAllowance();
    };

    main();
  }, []);

  //   useEffect(()=> {
  //     const main = async() =>{
  //       await checkCurrentVaultIds()
  //     };
  //     main();
  //   },[selectedOption])

  // const checkCurrentVaultIds = async() => {

  //   if(vaultManager !== null && vaultID !== ""){
  //     const vaultID
  //   setCurrentVaultDetails(await vaultManager.getVaultDetails(vaultId))
  //   }

  // }
  const validateFields1 = () => {
    const synthUsdAmountNum = parseFloat(synthUsdAmount);

    if (vaultID === "" || isNaN(synthUsdAmountNum) || synthUsdAmountNum < 0) {
      alert("Please fill in all required fields correctly");
      return false;
    }

    return true;
  };

  const validateFields2 = () => {
    const debtToRepayNum = parseFloat(debtToRepay);
    if (vaultID === "" || debtToRepay === "" || debtToRepayNum < 0) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };
  const validateFields3 = () => {
    const collatAmntNum = parseFloat(collatAmnt);
    if (vaultID === "" || collatAmnt === "" || collatAmntNum < 0) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const connectWallet = async () => {
    try {
      const publicKey = await window.ic.infinityWallet.requestConnect({
        whitelist,
      });
      router.reload();
      const address = publicKey.toText();
      setConnectedAddress(address);
      console.log(`The connected user's public key is:`, publicKey);
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.ic.infinityWallet.disconnect();
      router.reload();
      setIsConnected(false);
      setConnectedAddress(null);
      console.log("Wallet disconnected");
    } catch (e) {
      console.log("Error disconnecting wallet:", e);
    }
  };

  const getuserIdVaults = async () => {
    if (vaultManager !== null && connectPrincipal !== null) {
      try {
        console.log("inside getUserIdVaults");
        const vaultids = await vaultManager.getUserVaultIds(connectPrincipal);
        setCurrentVaultIds(vaultids);
      } catch (e) {
        console.log("error in getting user id vaults", e);
      }
    }
  };

  const resetState = () => {
    setVaultID("");
    setsynthUsdAmount("");
    setcollatAmnt("");
    setCurrentVaultDetails(null);
    setCurrentVaultIds([]);
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    resetState();
    if (e.target.value === "Repay Debt") {
      checkAllowance();
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const VaultManagercreateActor = async () => {
    try {
      const _vaultManager = await window.ic.infinityWallet.createActor({
        canisterId: vaultManagerAddress,
        interfaceFactory: vaultManageridlFactory,
        host: undefined,
      });
      setVaultManager(_vaultManager);
    } catch (e) {
      console.log("Error creating actor:", e);
    }
  };

  const checkAllowance = async () => {
    console.log("inside ");
    if (synBaseAddress !== null && connectPrincipal !== null) {
      console.log("heeeeere");
      const allowance_args: AllowanceArgs = {
        account: {
          owner: connectPrincipal,
          subaccount: [],
        },
        spender: {
          owner: Principal.fromText(vaultManagerAddress),
          subaccount: [],
        },
      };
      console.log("before allowance");
      const allowance = await synBaseAddress.icrc2_allowance(allowance_args);
      console.log(allowance);
      setAllowance(allowance);
    }
  };

  const handleApprove = async () => {
    console.log(
      `Checking synabse ${synBaseAddress} and connnectPrincipal ${connectPrincipal}`
    );
    if (synBaseAddress !== null && connectPrincipal !== null) {
      console.log("heeeeere");
      const approve_args: ApproveArgs = {
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: BigInt(100000000000),
        expected_allowance: [],
        expires_at: [],
        spender: {
          owner: Principal.fromText(vaultManagerAddress),
          subaccount: [],
        },
      };

      const approveResult = await synBaseAddress.icrc2_approve(approve_args);
      if ("Ok" in approveResult) {
        // It's of type 'Ok'
        const okValue = approveResult["Ok"]; // You can access the 'Ok' property
        console.log("Ok result:", okValue);
        router.reload();
        return true;
      } else if ("Err" in approveResult) {
        // It's of type 'Err'
        const errValue = approveResult["Err"]; // You can access the 'Err' property
        console.log("Err result:", errValue);
      } else {
        // It's neither 'Ok' nor 'Err'
        console.log("Invalid result:", approveResult);
      }
    }
  };

  const handleGetVaultDetails = async (e) => {
    e.preventDefault();
    if (vaultManager !== null) {
      const _vaultId = BigInt(parseInt(vaultID));
      const data = await vaultManager.getVaultDetails(_vaultId);
      setCurrentVaultDetails(data);

      const actualUserDebt = await vaultManager.getVaultActualDebt(_vaultId);
      setActualUserDebt(actualUserDebt);
    }
  };
  const SyntheTokenCreateActor = async () => {
    try {
      const _synthBase = await window.ic.infinityWallet.createActor({
        canisterId: synthTokenAddress,
        interfaceFactory: synBaseIdlFactory,
        host: undefined,
      });
      setSynBaseAddress(_synthBase);
    } catch (e) {
      console.log("Error creating synthActor:", e);
    }
  };

  const handleBorrow = async () => {
    if (validateFields1()) {
      if (synthUsdAmount !== null) {
        console.log("collatAmount", parseFloat(synthUsdAmount));
        const decimalAdjustedsUsd = BigInt(
          Math.pow(10, 8) * parseFloat(synthUsdAmount)
        );
        console.log("decimal adjusts", decimalAdjustedsUsd);

        const vaultId = BigInt(parseInt(vaultID));

        if (vaultManager !== null) {
          try {
            const result = await vaultManager.borrow(
              vaultId,
              decimalAdjustedsUsd
            );
            console.log(result);

            setCurrentVaultDetails(await vaultManager.getVaultDetails(vaultId));
            console.log(currentVautDetails);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };
  //change1
  //@bug here = if the valuues in the field are not entered it should not allow you to click buttons
  const handleRepayDebt = async () => {
    if (validateFields2()) {
      if (vaultManager !== null) {
        console.log("inside vault manager address");
        try {
          const _vaultId = BigInt(parseInt(vaultID));

          const parsedValue = parseFloat(debtToRepay);
          const _debtToRepay =
            (BigInt(Math.pow(10, 8)) * BigInt(Math.round(parsedValue * 10))) /
            BigInt(10);

          console.log(_vaultId);

          const result = await vaultManager.repayDebt(
            _vaultId,
            _debtToRepay,
            []
          );
          console.log(result);

          setCurrentVaultDetails(await vaultManager.getVaultDetails(_vaultId));
          console.log(currentVautDetails);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const handleaddCollateral = async () => {
    if (validateFields3()) {
      console.log("collatAmount", parseFloat(collatAmnt));

      const parsedValue = parseFloat(collatAmnt);
      console.log("parse values", parsedValue);
      const decimalAdjusted = BigInt(parsedValue * 10 ** 8);
      console.log("decimal adjusts", decimalAdjusted);

      const vaultId = BigInt(parseInt(vaultID));
      if (vaultManager !== null) {
        try {
          const result = await vaultManager.addCollateral(
            vaultId,
            decimalAdjusted
          );
          console.log(result);

          setCurrentVaultDetails(await vaultManager.getVaultDetails(vaultId));
          console.log(currentVautDetails);
        } catch (e) {
          //@todo: show the error messaeg e somewhere
          console.log(e);
        }
      }
    }
  };

  const handleCreateVaultFunction = async (e) => {
    e.preventDefault();
    if (vaultManager !== null) {
      console.log("inside handle create vault");
      try {
        const vaultId = await vaultManager.createVault([]);
        getuserIdVaults();
        console.log(vaultId);
      } catch (e) {
        console.log("Error occured when creating vault:", e);
      }
    }
  };

  const handleVaultIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Check if the input is a positive integer
    if (/^[0-9]\d*$/.test(inputValue)) {
      setVaultID(inputValue);
    } else {
      // If not a positive integer, you can display an error message or handle it in another way
      // For now, we clear the input
      setVaultID("");
    }
  };

  const handleVaultFunction = async () => {
    //vault details

    console.log("inside create vault", vaultID);
  };

  const getForm = () => {
    switch (selectedOption) {
      //asset.synthUsdAmount this will be userAssets 1st element  userAssets[0]
      case "Borrow":
        //  setVaultID(0);
        return (
          <form>
            <div className={styles.input3Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault LTV Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(currentVautDetails.vaultLtvRatio * 100)}%`
                      : `0%`}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collateral
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultCurrentCollateral !== undefined
                      ? `${currentVautDetails.vaultCurrentCollateral} CKBTC`
                      : 0}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collaterisation Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(
                          (1 / currentVautDetails.vaultLtvRatio) * 100
                        )}%`
                      : `0%`}
                  </p>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Health Factor
                </label>
                <div className={styles.TextRight}>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className={styles.input1Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  Vault ID
                  <input
                    type="text"
                    id="vaultID"
                    name="vaultID"
                    value={vaultID}
                    onChange={handleVaultIDChange}
                    placeholder="0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gas Fees: 10</p>
              </div>
            </div>
            <div className={styles.input2Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  synthUsd
                  <input
                    type="number"
                    id="synthUsd"
                    name="synthUsd"
                    value={synthUsdAmount}
                    onChange={(e) => setsynthUsdAmount(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gas fees</p>
              </div>
            </div>

            <button
              type="button"
              className={styles.Calculate}
              onClick={handleBorrow}
            >
              Borrow
            </button>
            <div>
              <button
                className={styles.Vault}
                onClick={() => setSelectedOption("Create Vault")}
                style={{ marginTop: "10px" }}
              >
                Create Vault
              </button>
            </div>
          </form>
        );
      //asset.ckbtAmount  this will be userAssets 2n element  userAssets[1]
      case "Add Collateral":
        // setVaultID(0);
        return (
          <form>
            <div className={styles.input3Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault LTV Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(
                          currentVautDetails.vaultLtvRatio * 100
                        )} %`
                      : `0%`}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collateral
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultCurrentCollateral !== undefined
                      ? `${currentVautDetails.vaultCurrentCollateral} CKBTC`
                      : 0}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collaterisation Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(
                          (1 / currentVautDetails.vaultLtvRatio) * 100
                        )} %`
                      : `0%`}
                  </p>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Health Factor
                </label>
                <div className={styles.TextRight}>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className={styles.input1Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  Vault ID
                  <input
                    type="text"
                    id="vaultID"
                    name="vaultID"
                    value={vaultID}
                    onChange={handleVaultIDChange}
                    placeholder="0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gass Fees: 10</p>
              </div>
            </div>
            <div className={styles.input2Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/ckBTC.png"
                      alt="ckBtc Icon"
                      width={30}
                      height={30}
                      className={styles.iconImage}
                    />
                  </div>
                  ckBtc
                </label>

                <input
                  type="number"
                  id="ckBtc"
                  name="ckBtc"
                  value={collatAmnt}
                  onChange={(e) => setcollatAmnt(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <div className={styles.gasFee}>
                <p>Gass Fees: 10</p>
              </div>
            </div>

            <div>
              <button
                type="button"
                className={styles.Calculate}
                onClick={handleaddCollateral}
              >
                Add Collateral
              </button>
            </div>
            <button
              className={styles.Vault}
              onClick={() => setSelectedOption("Create Vault")}
              style={{ marginTop: "10px" }}
            >
              Create Vault
            </button>
          </form>
        );
      //asset.ckbtcAmount
      case "Create Vault":
        //  setVaultID(0);
        return (
          <form>
            <div className={styles.input3Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault LTV Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(currentVautDetails.vaultLtvRatio * 100)}%`
                      : `0%`}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collateral
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultCurrentCollateral !== undefined
                      ? `${currentVautDetails.vaultCurrentCollateral} CKBTC`
                      : 0}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collaterisation Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(
                          (1 / currentVautDetails.vaultLtvRatio) * 100
                        )}%`
                      : `0%`}
                  </p>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Debt
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {actualUserDebt !== null
                      ? `${actualUserDebt} CKBTC`
                      : "Fetching"}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.input24Container}>
              <div className={styles.createWalletContainer}>
                <button
                  className={styles.createWalletButton}
                  onClick={handleCreateVaultFunction} //or use  onClick={handleCreateVaultFunction}
                >
                  Create Vault
                </button>
                {currentVaultIds.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "2px solid #0f0d3b",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      fontFamily: "Arial, sans-serif",
                      display: "inline-block",
                      padding: "5px",
                      marginTop: "20px",
                      width: "200px",
                      maxHeight: "300px", // Set a max height
                      overflowY: "auto", // Set overflowY to auto
                      scrollbarWidth: "thin", // for Firefox
                      scrollbarColor: "grey white", // for Firefox
                      MsOverflowStyle: "none", // for Internet Explorer 11
                    }}
                  >
                    <style>
                      {`
        ::-webkit-scrollbar {
          width: 12px; // set scrollbar width
        }

        ::-webkit-scrollbar-track {
          background: white; // set track background color
        }

        ::-webkit-scrollbar-thumb {
          background-color: grey; // set thumb color
          border-radius: 6px; // set thumb border radius
          border: 3px solid white; // set thumb border color
        }
        `}
                    </style>
                    <p
                      style={{
                        fontSize: "18px",
                        marginBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      Current Vault IDs:
                    </p>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: "0",
                        textAlign: "center",
                      }}
                    >
                      {currentVaultIds.map((vaultId) => (
                        <li
                          key={vaultId.toString()}
                          style={{
                            fontSize: "16px",
                            marginBottom: "5px",
                            padding: "5px 10px",
                            backgroundColor: "#fff",
                            border: "1px solid #9793d9",
                            borderRadius: "3px",
                            transition: "background-color 0.3s, transform 0.3s",
                            margin: "10px 5px",
                            color: "black",
                          }}
                        >
                          {vaultId.toString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {backendData && (
                  <p className={styles.backendData}>{backendData}</p>
                )}
              </div>
            </div>
            <div className={styles.input25Container}>
              <div className={styles.createWalletContainer}>
                <button
                  className={styles.VaultDetails}
                  onClick={handleGetVaultDetails}
                >
                  Get Vault Details
                </button>
              </div>
            </div>
            <div className={styles.input31Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  Vault ID
                  <input
                    type="text"
                    id="vaultID"
                    name="vaultID"
                    value={vaultID}
                    onChange={handleVaultIDChange}
                    placeholder="0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gass Fees: 10</p>
              </div>
            </div>
          </form>
        );

      case "Repay Debt":
        //  setVaultID(0);
        return (
          <form>
            <div className={styles.input3Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault LTV Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(currentVautDetails.vaultLtvRatio * 100)}%`
                      : `0%`}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collateral
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultCurrentCollateral !== undefined
                      ? `${currentVautDetails.vaultCurrentCollateral} CKBTC`
                      : 0}
                  </p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collaterisation Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>
                    {currentVautDetails !== null &&
                    currentVautDetails.vaultLtvRatio !== undefined
                      ? `${Math.round(
                          (1 / currentVautDetails.vaultLtvRatio) * 100
                        )}%`
                      : `0%`}
                  </p>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Health Factor
                </label>
                <div className={styles.TextRight}>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className={styles.input1Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  Vault ID
                  <input
                    type="text"
                    id="vaultID"
                    name="vaultID"
                    value={vaultID}
                    onChange={handleVaultIDChange}
                    placeholder="0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gass Fees: 10</p>
              </div>
            </div>
            <div className={styles.input2Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  synthUsd
                  <input
                    type="number"
                    id="synthUsd"
                    name="synthUsd"
                    value={debtToRepay}
                    onChange={(e) => setDebtToRepay(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gas fees</p>
              </div>
            </div>

            {Allowance &&
            (Allowance.allowance < BigInt(100000000000) ||
              (Allowance.expires_at &&
                Allowance.expires_at.length > 0 &&
                Allowance.expires_at[0] / BigInt(1000000) <
                  BigInt(new Date().getTime()))) ? (
              <button
                type="button"
                className={styles.Calculate}
                onClick={handleApprove} // Assuming this should trigger approval
              >
                Approve
              </button>
            ) : (
              <button
                type="button"
                className={styles.Calculate}
                onClick={handleRepayDebt} // Assuming this should trigger repayment
              >
                Repay Debt
              </button>
            )}
            <div>
              <button
                className={styles.Vault}
                onClick={() => setSelectedOption("Create Vault")}
                style={{ marginTop: "10px" }}
              >
                Create Vault
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Head>
        <title>SynthiFy App</title>
        <meta name="SynthiFy App" content=" SynthiFy App" key=" SynthiFy App" />
        <link rel="icon" href="/icons/tabicon.jpg" />
      </Head>
      <div className={styles.blob}></div>
      {isConnected ? (
        <div className={styles.tableContainer}>
          <table id="tableList" className={styles.tableList}>
            <thead>
              <tr>
                <th>Collateral Token</th>
                <th>Stablecoin</th>
                <th>Interest Rate</th>
                <th>Liquidation Fee</th>
                <th>Max. LTV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CkBTC</td>
                <td>synUSD</td>
                <td>1.5%</td>
                <td>0.5%</td>
                <td>80%</td>
                <td>
                  <button className={styles.borrowButton} onClick={toggleModal}>
                    Manage Vault
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {isModalOpen && (
            <div className={styles.modalBackdrop}>
              <div className={styles.modalContent}>
                <div className={styles.modalNavbar}>
                  <div className={styles.modalDropdown}>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <option>Borrow</option>
                      <option>Add Collateral</option>
                      <option>Create Vault</option>
                      <option>Repay Debt</option>
                    </select>
                    <span className={styles.arrow}>▼</span>
                  </div>
                  <div className={styles.closeIconContainer}>
                    <i
                      className={`fa fa-times-circle ${styles.closeIcon}`}
                      onClick={toggleModal}
                    ></i>
                  </div>
                </div>
                <div className={styles.modalContainer}>{getForm()}</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.notConnected}>
          <h1>Wallet Not Connected</h1>
          <p>
            Download and get started for free with{" "}
            <Link href="https://wallet.bitfinity.network/" target="_blank">
              BitFinity Wallet
            </Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Borrow;
