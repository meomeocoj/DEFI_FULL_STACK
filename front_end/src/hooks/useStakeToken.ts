
import { useEffect, useState } from 'react'
import { useContractFunction, useEthers, useTokenBalance } from "@usedapp/core"
import { utils } from "ethers"
import { constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    // approve
    // stake tokens
    const { chainId, account } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    // approve
    const { send: approveErc20Send, state: approveErc20State } = useContractFunction(erc20Contract, "approve", {
        transactionName: "Approve ERC20 transfer"
    })

    const approveAndStake = (amount: string) => {
        setAmoutToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount)
    }

    const { send: stakeSend, state: stakeState } = useContractFunction(tokenFarmContract, "stakeTokens", {
        transactionName: "Stake Tokens"
    })
    const [amountToStake, setAmoutToStake] = useState("0")

    const [state, setState] = useState(approveErc20State)

    // useEffect
    useEffect(() => {
        if (approveErc20State.status === "Success") {
            //stake
            stakeSend(amountToStake, tokenAddress)
        }
    }, [approveErc20State, tokenAddress, amountToStake])

    useEffect(() => {
        if (approveErc20State.status === "Success") {
            setState(stakeState)
        } else {
            setState(approveErc20State)
        }
    }, [approveErc20State, stakeState])


    // staking balance
    // const { send: stakingBalance, state: stakingBalanceState } = useContractFunction(tokenFarmContract, "stakingBalance", { transactionName: "Tracking Staking Balance" })
    return { approveAndStake, state }
}