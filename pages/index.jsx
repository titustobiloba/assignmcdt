import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './index.module.css'
import InvoiceApp from './InvoiceApp'

const features = [
  { label: 'Sell crypto', title: <>Turn crypto into naira <em>before your tea gets cold</em>.</>, copy: 'Send Bitcoin, USDT or any supported coin to your permanent Monica address. Naira credits at the live rate and clears to your bank over NIBSS in seconds.', image: '/app-screen-1.png', chips: ['0% fees', '40+ banks', 'Under 60s payout'] },
  { label: 'Pay bills', title: <>Every bill in Nigeria, <em>paid in seconds</em>.</>, copy: 'Airtime, mobile data, DStv and GOtv, electricity, betting wallets and gift cards, straight from your Monica balance.', image: '/app-screen-3 (3).png', chips: ['MTN · Airtel · Glo', 'Every DisCo', 'Gift cards'] },
  { label: 'Dollar card', title: <>Spend worldwide with a <em>virtual dollar card</em>.</>, copy: 'Create a USD Visa card funded straight from crypto or naira. Pay Netflix, Spotify, ads and global merchants.', image: '/app-screen-3.png', chips: ['Virtual USD Visa', 'Funded from crypto', 'Global merchants'] },
  { label: 'Send & receive', title: <>Transfers that <em>just land</em>.</>, copy: 'Send naira to any Nigerian bank or another Monica user instantly. Every transfer confirmed on screen.', image: '/app-screen-4.png', chips: ['Any bank, instant', 'Free Monica → Monica', 'Clear receipts'] },
]

const faqs = [
  ['Is Monica legit?', 'Yes. Monica is operated by Monica Technologies Limited, a Nigerian-registered company aligned with the SEC Virtual Asset Service Provider framework and NDPA data protection.'],
  ['How fast does Monica pay out to my bank?', 'Once your crypto deposit confirms onchain, naira credits to your Monica balance instantly. Bank withdrawals run over NIBSS instant transfer.'],
  ['What does Monica charge to convert crypto to naira?', '0% on conversion and 0% on bank withdrawal. The only cost is the onchain network fee for sending your crypto.'],
  ['Which coins and networks can I sell?', 'Bitcoin, Ethereum, Solana, Tron and BNB, plus USDT and USDC across Bitcoin, ERC20, TRC20, BEP20, Solana and Base.'],
  ['Do I need KYC to use Monica?', 'Yes. Verification takes one screen with BVN or NIN plus a quick selfie, and is required for compliant bank withdrawals.'],
]

function StoreButton({ platform }) {
  const isApple = platform === 'App Store'
  return <a className={styles.storeButton} href={isApple ? 'https://apps.apple.com/ng/app/monica-pay-send-bills/id6446216360' : 'https://play.google.com/store/apps/details?id=com.monicang'} target="_blank" rel="noreferrer">
    <span className={styles.storeIcon}>{isApple ? '●' : '▶'}</span>
    <span><small>{isApple ? 'Download on the' : 'Get it on'}</small><strong>{platform}</strong></span>
  </a>
}

function Brand() {
  return <a className={styles.brand} href="#top"><img src="/image.png" alt="" />onica<span>.cash</span></a>
}

export default function Home() {
  
  return <InvoiceApp />
}