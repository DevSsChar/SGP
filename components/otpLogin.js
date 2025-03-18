"use client";

import React, { useState, useTransition } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OtpLogin = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [currentOtp, setCurrentOtp] = useState(null);

  const handleResendCountdown = () => {
    let count = 60;
    setResendCountdown(count);
    const timer = setInterval(() => {
      count--;
      setResendCountdown(count);
      if (count === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const requestOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    // Basic phone number validation
    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      setError("Please enter a valid phone number with country code (e.g., +1234567890)");
      return;
    }

    setResendCountdown(60);

    startTransition(async () => {
      try {
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to send OTP');
        }

        setCurrentOtp(data.otp); // Store OTP for verification
        setIsOtpSent(true);
        setSuccess("OTP sent successfully. Please check your phone.");
        handleResendCountdown();
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || "Failed to send OTP. Please try again.");
        setResendCountdown(0);
      }
    });
  };

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");
      setSuccess("");

      try {
        if (otp === currentOtp) {
          setSuccess("OTP verified successfully!");
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      } catch (error) {
        setError("Failed to verify OTP. Please try again.");
      }
    });
  };

  const loadingIndicator = (
    <div role="status" className="flex justify-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Phone Verification</h1>
          <p className="mt-2 text-sm text-gray-600">
            {!isOtpSent 
              ? "Enter your phone number to receive a verification code"
              : "Enter the verification code sent to your phone"}
          </p>
          {isOtpSent && (
            <p className="mt-2 text-xs text-gray-500">
              For testing: Your OTP is {currentOtp}
            </p>
          )}
        </div>

        {!isOtpSent ? (
          <form onSubmit={requestOtp} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Enter phone number with country code (e.g., +1234567890)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full text-black"
                required
              />
              <p className="text-xs text-gray-400">
                Please enter your number with the country code (i.e. +44 for UK)
              </p>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!phoneNumber || isPending || resendCountdown > 0}
            >
              {isPending ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <InputOTP
                value={otp}
                onChange={(value) => setOtp(value)}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={verifyOtp}
                className="w-full"
                disabled={isPending || otp.length !== 6}
              >
                {isPending ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={requestOtp}
                className="w-full"
                disabled={isPending || resendCountdown > 0}
              >
                {resendCountdown > 0
                  ? `Resend OTP in ${resendCountdown}s`
                  : "Resend OTP"}
              </Button>
            </div>
          </div>
        )}

        <div className="text-center">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

        {isPending && loadingIndicator}
      </div>
    </div>
  );
}

export default OtpLogin;
