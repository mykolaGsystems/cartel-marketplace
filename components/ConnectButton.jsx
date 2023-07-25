import React from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CustomButton from './CustomButton/';
import IconButton from '@mui/material/IconButton';
import { useNearContext } from "../context/NearContext"


const ConnectButton = () => {
    const { accountId, signOut, modal } = useNearContext();

    if (accountId) {
		return (
			<CustomButton onClick={signOut}>{accountId}</CustomButton>
		);
	}
	return (
		<CustomButton 
            startIcon={<AccountBalanceWalletIcon />} 
            onClick={() => modal.show()}
        >
            Connect
        </CustomButton>
	);

};

export default ConnectButton;