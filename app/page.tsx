import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Satspay</h1>
      <WalletConnectButton />
      <UserCard />
    </main>
  );
}
