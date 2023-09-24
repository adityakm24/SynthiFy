import styles from "../assets/styles/Profile.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {encodeIcrcAccount	} from "@dfinity/ledger"
import { Principal } from "@dfinity/principal";
import {idlFactory as depositIdlFactory} from "../deposit.did"
import {idlFactory as vaultManageridlFactory} from "../vaultmanager.did.js"
import {_SERVICE as DepositModule} from "../deposit.did(t)"
import {_SERVICE as vaultmanager_SERVICE} from "../vaultmanager(ts).did"
import { Account } from "@/synbase(t).did";

const Profile = () => {
  const [connectedAddress, setConnectedAddress] = useState<string|null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen0, setIsModalOpen0] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [assets, setAssets] = useState([]); // State to store assets
  const [connectPrincipal,setConnectedPrincipal] = useState<Principal |null>(null)
  const [encodedAccount, setEncodedAccount] = useState("")
  const [vaultID, setvaultID] = useState("");
  const [address, setaddress] = useState("");
  const [amount, setamount] = useState("");

  const[depositModule,setDepositModule] = useState<DepositModule | null>(null)
  const [vaultManager,setVaultManager] = useState<vaultmanager_SERVICE |null>(null)

  const router = useRouter();
  const depositModuleAddress = "br5f7-7uaaa-aaaaa-qaaca-cai"
  const vaultManagerAddress = "avqkn-guaaa-aaaaa-qaaea-cai"


  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const result = await window.ic.infinityWallet.isConnected();
        const userAssets = await window.ic.infinityWallet.getUserAssets();
        console.log(`User's list of tokens/assets`, assets);
        setIsConnected(result);
        setAssets(userAssets); // Set the assets in state

        if (result) {
          const publicKey:Principal = await window.ic.infinityWallet.getPrincipal();
          setConnectedPrincipal(publicKey)
          const address = publicKey.toText();
          setConnectedAddress(address);
          setEncodedAccount(encodeIcrcAccount({owner:Principal.fromText(depositModuleAddress),subaccount:padPrincipalWithZeros(publicKey.toUint8Array())}))
          await DepositModulecreateActor()
          await VaultManagercreateActor()
        }
      } catch (e) {
        console.log("Error checking wallet connection:", e);
      }
    };

    checkWalletConnection();
  }, []);

  const toggleModal1 = () => {
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
      host:"http://localhost:4943/", 
    })

    setDepositModule(depositModule)

    } catch(e){
      console.log("Error creating actor:",e)
    };

  }

  const VaultManagercreateActor = async() => {
    try {
      const vaultManager = await window.ic.infinityWallet.createActor({
      canisterId: vaultManagerAddress,
      interfaceFactory: vaultManageridlFactory,
      host:"http://localhost:4943/", 
    })

    setVaultManager(vaultManager)

    } catch(e){
      console.log("Error creating actor:",e)
    };
  }

  const padPrincipalWithZeros = (blob:Uint8Array)=> {
    let newUin8Array = new Uint8Array(32);
    newUin8Array.set(blob);
    return newUin8Array;
}

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

      
      if(vaultManager!==null){

        try{
        const _vauldId = BigInt(parseInt(vaultID))
        const parsedValue = parseFloat(amount)
        const amountToWithdraw = BigInt(Math.pow(10, 8)) * BigInt(Math.round(parsedValue * 10)) / BigInt(10);
        const toAccount:Account = {
          owner:Principal.fromText(address),
          subaccount:[]
        }


        console.log(await vaultManager.withdrawCollateral(_vauldId,amountToWithdraw,toAccount))
      }
      catch(e){
        console.log("Error occured:",e)
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
      {isConnected ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div className={styles.formContainer}>
            <h1>Withdraw</h1>
            <h4>Balance: $1.0</h4>
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

          <div
            style={{
              width: "100%",
              height: "100%",
              margin: "auto",
              display: "grid",
              placeItems: "center",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              padding: "20px",
            }}
          >
            <button className={styles.general} onClick={toggleModal0}>
              Deposit CkBTC
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

            <button className={styles.general} onClick={toggleModal1}>
              Deposit BTC
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
                      <h3>Placeholder </h3>
                      <br></br>
                      <br></br>
                    </div>

                    <div className={styles.modalActions}>
                      <button className={styles.general0}>
                        Get Deposit Address
                      </button>
                      <br></br>
                      <button className={styles.general2}>
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
        <p>Wallet Not Connected</p>
      )}
    </div>
  );
};

export default Profile;
