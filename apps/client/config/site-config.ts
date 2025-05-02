import { Metadata } from 'next';

const TITLE = 'TruthChain - A network for news that is not controlled by any entity';
const DESCRIPTION =
  'A network for news that is not controlled by any entity. Instead, anyone can publish facts on chain by providing the fact, its source and proof of authenticity. All facts are recorded on chain. Numerous AI models can compete to present this data in a human readable fashion. For example, the same basketball match may be interpretted differently by the fans of either teams. Similarly, political actions may have multiple interpretations. The truth chain should be a record of all factual information and AI models on top should churn out interesting articles using these onchain facts.';

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const siteConfig: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
  },
  applicationName: 'TruthChain',
  creator: 'praash',

  category: 'Blockchain',
  alternates: {
    canonical: BASE_URL,
  },
  keywords: [
    'DEMI',
    'Solana',
    'Credit',
    'Rent',
    'solana transaction',
    'solana credit collections',
    'solana DEMI rent collections',
    'web3',
    'blockchain',
    "media",
    "news"
  ],
  metadataBase: new URL(BASE_URL!),
};