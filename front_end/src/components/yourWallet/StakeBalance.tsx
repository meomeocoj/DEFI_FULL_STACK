import { Token } from "../Main"
import { useContractCall, useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg"

export interface StakeBalanceProps {
    token: Token
}
export const StakeBalance = ({ token }: StakeBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenStakingBalance = useContractCall
    const tokenBalance = useTokenBalance(address, account)
    const formatedTokenbalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (
        <BalanceMsg
            label={`Your un-staked ${name} balance`}
            tokenImgSrc={image}
            amount={formatedTokenbalance} />
    )
}