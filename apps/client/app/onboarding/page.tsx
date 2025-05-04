"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import {
  ArrowRight,
  Upload,
  Wallet,
  WalletIcon,
  BadgeCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ReclaimVerification from "../../components/ui/reclaim-verification";
import { useAuth } from "../../hooks/useAuth";
import { onBoardUsers } from "../../actions/onBoardUser";

enum CreatorType {
  Youtuber = "Youtuber",
  Musician = "Musician",
  other = "other",
}

enum ExperienceWithDigitalAssets {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advance = "Advance",
}

enum SocialAccount {
  Youtube = "Youtube",
  Instagram = "Instagram",
  Twitter = "Twitter",
}

enum VerificationStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Verified = "Verified",
  Failed = "Failed",
}

export interface FormData {
  creatorType: CreatorType;
  socialMedia: string;
  experience: ExperienceWithDigitalAssets;
  walletConnected: boolean;
  walletAddress?: string;
  userid?: string;
  verificationStatus: VerificationStatus;
  socialAccount: string;
  proof: any;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(1);
  const { user } = useAuth();
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    creatorType: CreatorType.Youtuber,
    socialMedia: "",
    socialAccount: SocialAccount.Instagram,
    experience: ExperienceWithDigitalAssets.Beginner,
    walletConnected: false,
    verificationStatus: VerificationStatus.NotStarted,
    proof: {},
  });
  
  // Update form data when wallet connection changes
  useEffect(() => {
    if (connected && publicKey) {
      const walletAddress = publicKey.toString();
      setFormData((prev) => ({
        ...prev,
        walletConnected: true,
        walletAddress: walletAddress,
      }));
      console.log("Wallet connected with address:", walletAddress);
    }
  }, [connected, publicKey]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const connectWallet = async () => {
    try {
      console.log("Connecting to Solana wallet...");

      // Check if wallet is connected and public key exists
      if (connected && publicKey) {
        const walletAddress = publicKey.toString();
        console.log("Wallet address:", walletAddress);

        formData.userid = user.id;
        console.log("form.userid", formData.userid);
        // Add wallet address to form data
        setFormData((prev) => ({
          ...prev,
          walletConnected: true,
          walletAddress: walletAddress,
        }));

        console.log("Form data ready for API call:", {
          ...formData,
          walletConnected: true,
          walletAddress: walletAddress,
        });

        const response = await onBoardUsers({
          ...formData,
          walletAddress: walletAddress,
        });
        console.log("response---", response);
        if (response.success) {
          toast.success("Wallet connected successfully!");
        } else {
          toast.error(`Connection Failed ${response.error || "Unknown error"}`);
        }
      } else {
        toast.info("Please connect your wallet using the wallet button");
      }
    } catch (err) {
      toast.error(`Connection Failed ${err}`);
    }
  };

  // Handler for verification status updates from ReclaimVerification
  const handleVerificationComplete = (
    status: "verified" | "failed",
    proofs?: any[]
  ) => {
    if (status === "verified" && proofs) {
      setFormData((prev) => ({
        ...prev,
        verificationStatus: VerificationStatus.Verified,
        proof: proofs,
      }));
      toast.success("Identity verification successful!");
    } else {
      setFormData((prev) => ({
        ...prev,
        verificationStatus: VerificationStatus.Failed,
      }));
      toast.error("Identity verification failed. Please try again.");
    }
  };

  const completeOnboarding = async () => {
    const contextString = formData.proof[0].claimData.context;
    const contextData = JSON.parse(contextString);

    // Extract the username
    const username = contextData.extractedParameters.username;
    console.log(username)
    console.log(formData.socialMedia)

    if (username !== formData.socialMedia) {
      toast.error(
        "Your username isn't matching with the handle you verified with"
      );
      return;
    }
    try {
      formData.userid = user.id;
      const response = await onBoardUsers({
        ...formData,
      });

      if (response.success) {
        toast.success(
          "You have successfully completed the onboarding process!"
        );
        localStorage.setItem("isOnboarded", "true");
        router.replace("/");
      } else {
        toast.error(`Onboarding failed: ${response.error || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.socialMedia ||
        !formData.creatorType ||
        !formData.experience
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
    }

    if (step === 2 && !formData.walletConnected) {
      toast.error("Please connect your wallet to continue.");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      if (formData.verificationStatus !== VerificationStatus.Verified) {
        toast.error("Please complete identity verification to continue.");
        return;
      }
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl px-4">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <StepIndicator
              stepNumber={1}
              title="Creator Profile"
              active={step === 1}
              completed={step > 1}
              icon={<Upload className="h-5 w-5" />}
            />
            <StepConnector completed={step > 1} />
            <StepIndicator
              stepNumber={2}
              title="Connect Wallet"
              active={step === 2}
              completed={step > 2}
              icon={<Wallet className="h-5 w-5" />}
            />
            <StepConnector completed={step > 2} />
            <StepIndicator
              stepNumber={3}
              title="Verify Identity"
              active={step === 3}
              completed={
                formData.verificationStatus === VerificationStatus.Verified
              }
              icon={<BadgeCheck className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {/* Step 1: Creator Profile */}
          {step === 1 && (
            <>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Creator Profile</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Please provide your details to join our digital creator community.
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="creatorType" className="block text-sm font-medium text-white-700">
                    Creator Type
                  </label>
                  <select
                    id="creatorType"
                    name="creatorType"
                    className="w-full p-2 border border-gray-300 text-black  bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.creatorType}
                    onChange={handleInputChange}
                  >
                    <option value={CreatorType.Musician}>Musician</option>
                    <option value={CreatorType.Youtuber}>Youtuber</option>
                    <option value={CreatorType.other}>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700">
                    Social Media Handle
                  </label>
                  <input
                    id="socialMedia"
                    name="socialMedia"
                    type="text"
                    className="w-full p-2 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="yourhandle"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience with Digital Assets
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    className="w-full p-2 border border-gray-300 text-black  bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value={ExperienceWithDigitalAssets.Beginner}>
                      Beginner
                    </option>
                    <option value={ExperienceWithDigitalAssets.Intermediate}>
                      Intermediate
                    </option>
                    <option value={ExperienceWithDigitalAssets.Advance}>
                      Advanced
                    </option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="socialAccount" className="block text-sm font-medium text-gray-700">
                    Social Account for Verification
                  </label>
                  <select
                    id="socialAccount"
                    name="socialAccount"
                    className="w-full p-2 border border-gray-300 text-black  bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.socialAccount}
                    onChange={handleInputChange}
                  >
                    <option value={"Instagram"}>Instagram</option>
                    <option value={"Youtube"}>Youtube</option>
                    <option value={"Twitter"}>Twitter</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Connect Wallet */}
          {step === 2 && (
            <>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Connect Solana Wallet</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Connect your Solana wallet to complete the onboarding process.
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="border border-gray-300 rounded-md p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Wallet className="h-16 w-16 text-blue-600" />
                    <h3 className="text-lg font-medium">Connect Your Wallet</h3>
                    <p className="text-center text-gray-500">
                      Connect your Solana wallet to access all features of our
                      platform.
                    </p>
                    {formData.walletConnected ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2 text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Wallet Connected Successfully</span>
                        </div>
                        {formData.walletAddress && (
                          <div className="mt-2 p-2 bg-gray-100 text-black rounded-md">
                            <p className="text-sm font-mono break-all">
                              {formData.walletAddress}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <WalletModalProvider>
                          <div className="flex justify-between gap-2">
                            <WalletMultiButton
                              style={{
                                background: "rgb(37 99 235)",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "0.375rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            />
                          </div>
                        </WalletModalProvider>
                        <button
                          onClick={connectWallet}
                          className="flex items-center justify-center mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                        >
                          <WalletIcon className="size-5 mr-2" />
                          Complete Connection
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Identity Verification with Reclaim */}
          {step === 3 && (
            <>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Verify Your Identity</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Complete identity verification to ensure security and compliance.
                </p>
              </div>
              <div className="p-6 space-y-4">
                {formData.verificationStatus === VerificationStatus.Verified ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <h2 className="font-bold text-lg mb-2">
                      Verification Successful!
                    </h2>
                    <p className="mb-4">
                      Your identity has been verified successfully.
                    </p>

                    <details className="mb-4">
                      <summary className="cursor-pointer font-medium">
                        View Proof Details
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs max-h-60">
                        {JSON.stringify(formData.proof, null, 2)}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <ReclaimVerification
                    account={formData.socialAccount}
                    onVerificationComplete={handleVerificationComplete}
                  />
                )}
              </div>
            </>
          )}

          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className={`px-4 py-2 rounded-md border border-gray-300 ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={
                (step === 2 && !formData.walletConnected) ||
                (step === 3 &&
                  formData.verificationStatus !== VerificationStatus.Verified)
              }
              className={`px-4 py-2 rounded-md flex items-center ${
                (step === 2 && !formData.walletConnected) ||
                (step === 3 && formData.verificationStatus !== VerificationStatus.Verified)
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {step === 3 ? "Complete" : "Continue"}
              {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  active: boolean;
  completed: boolean;
  icon?: React.ReactNode;
}

// Step indicator component
function StepIndicator({
  stepNumber,
  title,
  active,
  completed,
  icon,
}: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
          active
            ? "bg-blue-600 text-white"
            : completed
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600"
        }`}
      >
        {completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          icon || stepNumber
        )}
      </div>
      <span
        className={`text-sm font-medium ${
          active
            ? "text-blue-600"
            : completed
              ? "text-green-500"
              : "text-gray-600"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

interface StepConnectorProps {
  completed: boolean;
}

function StepConnector({ completed }: StepConnectorProps) {
  return (
    <div className="flex-1 mx-2">
      <div
        className={`h-1 ${completed ? "bg-green-500" : "bg-gray-200"}`}
      ></div>
    </div>
  );
}