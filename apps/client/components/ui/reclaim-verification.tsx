'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

interface Proof {
  identifier: string;
  claimData: object;
  ownerPublicKey: string;
}

interface ReclaimVerificationProps {
  account: string;
  onVerificationComplete: (status: 'verified' | 'failed', proofs?: Proof[]) => void;
}

export default function ReclaimVerification({ account, onVerificationComplete }: ReclaimVerificationProps) {
  const [requestUrl, setRequestUrl] = useState<string>('');
  const [proofs, setProofs] = useState<Proof[] | null>(null);
  const [status, setStatus] = useState<'initializing' | 'ready' | 'verifying' | 'success' | 'error'>('initializing');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getVerificationReq = async () => {
    try {
      setStatus('initializing');
      setIsLoading(true);

      const APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID as string;
      const APP_SECRET = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET as string;
      let PROVIDER_ID;
      if(account == "Instagram"){
        PROVIDER_ID = process.env.NEXT_PUBLIC_INSTAGRAM_OWNERSHIP_PROVIDER_ID as string;
      }else if (account === "Youtube"){
        PROVIDER_ID = process.env.NEXT_PUBLIC_YOUTUBE_PROVIDER_ID as string;
      }else{
        PROVIDER_ID = process.env.NEXT_PUBLIC_TWITTER_USER_PROFILE_PROVIDER_ID as string;
      }
      console.log("APP_ID", APP_ID, "APP_SECRET", APP_SECRET, "PROVIDER_ID", PROVIDER_ID)
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
      console.log("reclaim", reclaimProofRequest);

      const requestUrl = await reclaimProofRequest.getRequestUrl();
      console.log('Request URL:', requestUrl);
      setRequestUrl(requestUrl);
      setStatus('ready');

      await reclaimProofRequest.startSession({
        onSuccess: (proof) => {
          const proofs = Array.isArray(proof) ? proof : [proof];
          console.log('Verification success', proofs);
          setProofs(proofs as any);
          setStatus('success');
          
          // Call the callback to update parent component
          onVerificationComplete('verified', proofs as any);
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('reclaimVerificationStatus', 'verified');
            localStorage.setItem('reclaimProofs', JSON.stringify(proofs));
          }
        },
        onError: (error: Error) => {
          console.error('Verification failed', error);
          setErrorMessage(error.message || 'Verification failed');
          setStatus('error');
          
          // Notify parent component about failure
          onVerificationComplete('failed');
          
          setTimeout(() => {
            setStatus('ready');
            setErrorMessage('');
          }, 5000);
        },
      });
    } catch (error) {
      console.error('Failed to initialize verification:', error);
      setErrorMessage('Failed to initialize verification process. Please try again.');
      setStatus('error');
      onVerificationComplete('failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setProofs(null);
    setErrorMessage('');
    getVerificationReq();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStatus = localStorage.getItem('reclaimVerificationStatus');
      const savedProofs = localStorage.getItem('reclaimProofs');
      
      if (savedStatus === 'verified' && savedProofs) {
        const parsedProofs = JSON.parse(savedProofs);
        setProofs(parsedProofs);
        setStatus('success');
        setIsLoading(false);
        // Notify parent component with cached proofs
        onVerificationComplete('verified', parsedProofs);
      } else {
        getVerificationReq();
      }
    }
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl text-gray-800 text-center font-bold mb-4">Scan the QR and Verify Yourself</h1>
      
      {isLoading && (
        <div className="text-center py-4">
          <p>Initializing verification...</p>
          <div className="mt-2 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      )}

      {status === 'ready' && requestUrl && (
        <div className="text-center">
          <p className="mb-4">Scan this QR code with your Reclaim Wallet app</p>
          <div className="inline-block p-4 bg-white rounded-md shadow-sm">
            <QRCode value={requestUrl} size={200} />
          </div>
          <p className="mt-4 text-sm text-gray-600">Waiting for verification...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {errorMessage}</span>
          <button 
            onClick={handleRetry}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry Verification
          </button>
        </div>
      )}

      {status === 'success' && proofs && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <h2 className="font-bold text-lg mb-2">Verification Successful!</h2>
          <p className="mb-4">Your identity has been verified successfully.</p>
          
         {process.env.NODE_ENV === "development"  && <details className="mb-4">
            <summary className="cursor-pointer font-medium">View Proof Details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs max-h-60">
              {JSON.stringify(proofs, null, 2)}
            </pre>
          </details>}
        </div>
      )}
    </div>
  );
}