import { formatUnits } from "@ethersproject/units"
import { useEthers, useNotifications, useTokenBalance } from "@usedapp/core"
import { Token } from "../Main"
import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core"
import React, { useEffect, useState } from 'react'
import { useStakeTokens } from "../../hooks/useStakeToken"
import { utils } from "ethers"
import { Alert } from "@material-ui/lab"

interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()
    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
    }
    const { approveAndStake, state: approveErc20State } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(String(amountAsWei))
    }
    const [showErc20ApprovalSuccess, setshowErc20ApprovalSuccess] = useState(false)
    const [showErc20StakeSuccess, setshowErc20StakeSuccess] = useState(false)
    const handleCloseSnack = () => {
        setshowErc20ApprovalSuccess(false)
        setshowErc20StakeSuccess(false)
    }

    const isMining = approveErc20State.status === "Mining"

    useEffect(() => {
        if (notifications.filter((notifications) =>
            notifications.type === "transactionSucceed" &&
            notifications.transactionName === "Approve ERC20 transfer").length > 0) {
            setshowErc20ApprovalSuccess(true)
            setshowErc20StakeSuccess(false)

        }
        if (notifications.filter((notifications) =>
            notifications.type === "transactionSucceed" &&
            notifications.transactionName === "Stake Tokens").length > 0) {
            setshowErc20StakeSuccess(true)
            setshowErc20ApprovalSuccess(false)
        }
    }, [notifications, showErc20ApprovalSuccess, showErc20StakeSuccess])

    return (
        <>
            <div>
                <Input onChange={handleInputChange} />
                <Button
                    color="primary"
                    size="large"
                    onClick={handleStakeSubmit}
                    disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "Stake"}
                </Button>
            </div>

            <Snackbar open={showErc20ApprovalSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    ERC token transfer approved! Now approve the 2nd trancsaction
                </Alert>
            </Snackbar>
            <Snackbar open={showErc20StakeSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Token Staked
                </Alert>
            </Snackbar>
        </>
    )
}