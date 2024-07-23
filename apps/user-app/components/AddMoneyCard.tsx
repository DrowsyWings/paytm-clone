"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";

import { createOnRampTransaction } from "../app/lib/actions/createOnRampTxns";
import axios from "axios";
import Loader from "./Loader";

const SUPPORTED_BANKS = [
  {
    name: "For Testing",
    redirectUrl: "http://localhost:3003/hdfc",
  },
];

export const AddMoney = async () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle amount change
  const handleAmountChange = (value: any) => {
    if (/^\d*$/.test(value)) {
      // Check if value is numeric
      setAmount(value);
      setError(""); // Clear any existing errors
    } else {
      setError("Only numbers allowed"); // Set error if not numeric
    }
  };

  return (
    <Card title="Add Money To Your Wallet">
      <div className="w-full ">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => handleAmountChange(value)}
        />
        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(SUPPORTED_BANKS.find((x) => x.name)?.name || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (!amount.trim()) {
                setError("Can't be empty");
                return; // Exit function early
              }
              try {
                setIsLoading(true);
                // Ensure amount is converted to integer before multiplication
                const result = await createOnRampTransaction(
                  parseInt(amount) * 100,
                  provider
                );
                const response = await axios.post(
                  "http://localhost:3003/hdfc",
                  {
                    token: result.token,
                    amount: amount,
                    userId: result.userId,
                  }
                );
                if (response.status === 200) {
                  setIsLoading(false);
                  // You might want to handle successful transaction here
                  // For example, show a success message or redirect
                  // window.location.href = redirectUrl || "";
                }
              } catch (error) {
                setIsLoading(false);
                setError("An error occurred while processing your request.");
                console.error("Error:", error);
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size="small" color="text-white" />
            ) : (
              "Add Money"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
