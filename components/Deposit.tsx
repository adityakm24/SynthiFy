import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../assets/styles/Deposit.module.css";
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

const Deposit = () => {
    // ... component logic ...
  };
  
export default Deposit;