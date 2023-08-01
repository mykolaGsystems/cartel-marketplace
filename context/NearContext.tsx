"use client";
import  React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";
import { map, distinctUntilChanged } from "rxjs";
import {
	FinalExecutionOutcome,
	Optional,
	setupWalletSelector,
	WalletSelector,
} from "@near-wallet-selector/core";
import {
	setupModal,
	WalletSelectorModal,
} from "@near-wallet-selector/modal-ui";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { providers } from "near-api-js";
import { toast, ToastContainer } from "react-toastify";
import { Transaction } from "near-api-js/lib/transaction";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
// import { MARKETPLACE_CONTRACT, NETWORK_ID, NFT_CONTRACT } from "../lib/env";

const NETWORK_ID = "testnet"
const MARKETPLACE_CONTRACT = "dev-1690832838546-52413979946374"

type Account = {
	accountId: string;
	active: boolean;
};
type CallMethodsParams = {
	contractId: string;
	methodName: string;
	args: any;
	gas: string;
	amount: string;
};
export interface IActionsParams {
	type: string;
	params: {
		methodName: string;
		args: {};
		gas: string;
		deposit: string;
	};
}
const NearContext = createContext<{
	selector: WalletSelector | null;
	modal: WalletSelectorModal | null;
	accounts: Account[];
	accountId: string | null;
	viewMethod: (
		contractId: string,
		methodName: string,
		args: any
	) => Promise<any>;
	signOut: () => Promise<void>;
	callMethods: (
		params: CallMethodsParams[]
	) => Promise<void | FinalExecutionOutcome[]>;
	callMethodsSingleTransaction: (
		contractId: string,
		actions: IActionsParams[]
	) => Promise<void | FinalExecutionOutcome[]>;
	isBrowserWallet: boolean | null;
}>({
	selector: null,
	modal: null,
	accounts: [],
	accountId: null,
	viewMethod: () => Promise.resolve(null),
	signOut: () => Promise.resolve(),
	callMethods: () => Promise.resolve(),
	callMethodsSingleTransaction: () => Promise.resolve(),
	isBrowserWallet: null,
});

interface NearProviderProps {
	children: React.ReactNode | React.ReactNode[];
}
declare global {
	interface Window {
		selector: any;
		modal: any;
	}
}

export const NearProvider = ({ children }: NearProviderProps) => {
	const [selector, setSelector] = useState<WalletSelector | null>(null);
	const [modal, setModal] = useState<WalletSelectorModal | null>(null);
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [isBrowserWallet, setIsBrowserWallet] = useState<boolean | null>(null);

	const init = useCallback(async () => {
		const _selector = await setupWalletSelector({
			network: NETWORK_ID,
			debug: true,
			modules: [
				setupSender(),
				setupMeteorWallet(),
				setupNearWallet(),
                setupMyNearWallet(),
				...(await setupDefaultWallets()),
			],
		});
		const _modal = setupModal(_selector, { contractId: MARKETPLACE_CONTRACT });
		const state = _selector.store.getState();
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
	}, [init]);
	useEffect(() => {
		if (!selector) {
			return;
		}

		const subscription = selector.store.observable
			.pipe(
				map((state: any) => state.accounts),
				distinctUntilChanged()
			)
			.subscribe(async (nextAccounts: any) => {
				const wallet = await selector.wallet().catch((err) => {});

				if (wallet) {
					setIsBrowserWallet(
						((await selector.wallet()) as any).type === "browser"
					);
				}
				console.log("Accounts Update", nextAccounts);

				setAccounts(nextAccounts);
			});

		return () => subscription.unsubscribe();
	}, [selector]);

	if (!selector || !modal) {
		return null;
	}

	const accountId = accounts.find((account) => account.active)?.accountId || null;

	async function viewMethod(contractId: string, methodName: string, args: {}) {
		if (!selector) return;

		const { network } = selector.options;
		const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
		const res: any = await provider.query({
			request_type: "call_function",
			account_id: contractId,
			method_name: methodName,
			args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
			finality: "optimistic",
		});

		return JSON.parse(Buffer.from(res.result).toString());
	}
	async function signOut() {
		if (!selector) return;
		const _wallet = await selector.wallet();
		_wallet.signOut().catch((err) => {
			console.log("Failed to sign out");
			console.error(err);
		});
	}

	async function callMethods(params: CallMethodsParams[]) {
		if (!selector) return;
		if (!accountId) {
			toast.warn("Please connect wallet");
			throw new Error("ERR_NOT_SIGNED_IN");
		}
		const { contract } = selector.store.getState();
		const wallet = await selector.wallet();
		if (!contract) {
			toast.warn("Error getting contract");
			throw new Error("ERR_NOT_SIGNED_IN");
		}
		const transactions: any = [];
		for (const param of params) {
			transactions.push({
				signerId: accountId,
				receiverId: param.contractId || contract.contractId,
				actions: [
					{
						type: "FunctionCall",
						params: {
							methodName: param.methodName || "add_message",
							args: param.args || {},
							gas: param.gas ? param.gas : "250000000000000",
							deposit: param.amount ? param.amount.toString() : "0",
						},
					},
				],
			});
		}

		const res = await wallet
			.signAndSendTransactions({
				transactions,
			})
			.catch((err) => {
				throw err;
			});
		return res;
	}

	async function callMethodsSingleTransaction(
		contractId: string,
		actions: IActionsParams[]
	) {
		if (!selector) return;
		if (!accountId) {
			toast.warn("Please connect wallet");
			throw new Error("ERR_NOT_SIGNED_IN");
		}
		const { contract } = selector.store.getState();
		const wallet = await selector.wallet();
		if (!contract) {
			toast.warn("Error getting contract");
			throw new Error("ERR_NOT_SIGNED_IN");
		}
		const transactions: any = [];
		transactions.push({
			signerId: accountId,
			receiverId: contractId,
			actions,
		});

		const res = await wallet
			.signAndSendTransactions({
				transactions,
			})
			.catch((err) => {
				throw err;
			});
		return res;
	}
	const sharedState = {
		selector,
		modal,
		accounts,
		accountId,
		viewMethod,
		signOut,
		callMethods,
		callMethodsSingleTransaction,
		isBrowserWallet,
	};

	return (
		<NearContext.Provider value={sharedState}>{children}</NearContext.Provider>
	);
};

export function useNearContext() {
	return useContext(NearContext);
}