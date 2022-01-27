// eslint-disable-next-line

import { Token } from "../Main"
import { Box, Tab } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import React, { useState } from "react"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px",
    },
    header: {
        color: "white"
    }
}))

interface YourWalletProps {
    supportedTokens: Array<Token>
}
export const YourWallet = ({ supportedTokens }: YourWalletProps) => {

    const classes = useStyles()
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)
    const [selectedTokenIndexUnStake, setSelectedTokenIndexUnStake] = useState<number>(0)

    const handleChage = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }
    const handleUnStakeChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndexUnStake(parseInt(newValue))
    }
    return (
        <Box>
            <h1 className={classes.header}>Your Wallet!</h1>
            <Box className={classes.box}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChage} aria-label="stake form tabs">
                        {
                            supportedTokens.map((token, index) => {
                                return (
                                    <Tab label={token.name} value={index.toString()} key={index} />
                                )
                            })
                        }
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <WalletBalance token={token} />
                                    <StakeForm token={token} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
            <h1 className={classes.header}>UnStaked Token!</h1>

            <Box className={classes.box}>
                <TabContext value={selectedTokenIndexUnStake.toString()}>
                    <TabList onChange={handleUnStakeChange} aria-label="unstake form tabs">
                        {
                            supportedTokens.map((token, index) => {
                                return (
                                    <Tab label={token.name} value={index.toString()} key={index} />
                                )
                            })
                        }
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <WalletBalance token={token} />
                                    <StakeForm token={token} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}