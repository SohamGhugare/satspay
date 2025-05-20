# SatsPay

A decentralized lending platform built on Stacks that enables users to borrow against their sBTC collateral.

## Overview

SatsPay allows users to lock their sBTC as collateral to borrow USD. The platform implements a secure and transparent lending system with automated collateral management and liquidation mechanisms.

## Key Features

- **Collateralized Lending**: Borrow USD using sBTC as collateral
- **Automated Collateral Management**: Secure locking and unlocking of sBTC
- **Flexible Loan Terms**: Choose your loan amount and duration
- **Transparent Interest Rates**: Fixed 5% interest rate on all loans
- **Liquidation Protection**: 150% collateral ratio requirement
- **Real-time Loan Tracking**: Monitor your loans and collateral status

## Technical Stack

- **Smart Contracts**: Clarity (Stacks' smart contract language)
- **Frontend**: Next.js, React, TypeScript
- **Wallet Integration**: Stacks Connect
- **Development**: Clarinet (Stacks development environment)

## Smart Contracts

1. **sBTC Token Contract** (`sbtc-token.clar`)
   - Manages sBTC token transfers
   - Handles token approvals and allowances
   - Implements standard token functionality

2. **Collateral Contract** (`collateral.clar`)
   - Manages collateral locking/unlocking
   - Tracks user collateral positions
   - Handles liquidation processes

3. **Loan Contract** (`loan.clar`)
   - Creates and manages loans
   - Calculates interest and repayments
   - Integrates with collateral management

## Getting Started

1. Run yarn:
   ```bash
   yarn dev
   ```

2. Start the development environment:
   ```bash
   clarinet dev
   ```

3. Run tests:
   ```bash
   clarinet test
   ```

## Security

- 150% collateral ratio requirement
- Automated liquidation for overdue loans
- Secure token transfer mechanisms
- Owner-only administrative functions
