import React,{ createContext, useContext, useEffect, useState,useCallback } from "react";
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { providers } from "near-api-js";
import { toast, ToastContainer } from "react-toastify";
import { Transaction } from "near-api-js/lib/transaction";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { FinalExecutionOutcome, Optional, setupWalletSelector, WalletSelector } from "@near-wallet-selector/core";
import { setupModal, WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { map, distinctUntilChanged } from "rxjs";
const Context = createContext();

const NETWORK_ID = "mainnet";
const CONTRACT_ID = "guest-book.mainnet"

export const NearContext = ({ children }) => {
	const [selector, setSelector] = useState(null);
	const [modal, setModal] = useState(null);
	const [account, setAccounts] = useState(null);

	const init = useCallback(async () => {
		const _selector = await setupWalletSelector({
			network: NETWORK_ID,
			modules: [
				setupSender(),
				setupMeteorWallet(),
				setupNearWallet(),
				...(await setupDefaultWallets()),
			],
		});	

		const _modal = setupModal(selector, {
			contractId: CONTRACT_ID
		});

		const state = _selector.store ? _selector.store.getState() : null;
		console.log("State", state);
		setAccounts(state.accounts);

		window.selector = _selector;
		window.modal = _modal;

		setSelector(_selector);
		setModal(_modal);

	}, []);

	useEffect(() => {
		init().catch((err) => {
			console.error(err);
			alert("Failed to initialize wallet selector");
			
		});
		console.log("Initialised")
	}, [init]);

	
	
	const signOut = useCallback(async () => {
		if (!selector) return;
		const _wallet = await selector.wallet();
		_wallet.sign_out().catch((err) => {
		  console.log("Failed to sign out");
		  console.error(err);
		});
	});

	if (!selector || !modal) {
		return null;
	}

	  
	const accountId = account;
	


	return (
		<Context.Provider
		  value={{
			selector,
			modal,
			accountId,
			signOut,
		  }}
		>
		  {children}
		</Context.Provider>
	  )
}

export const useNearContext = () => useContext(Context);