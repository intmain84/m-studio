"use client";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import { useState } from "react";

import BaseModal from "./BaseModal";
import FormInput from "../FormInput";

type CallbackModalProps = {
  open: boolean;
  setModal: (open: null) => void;
  className?: string;
};

type FormData = {
  name: string;
  phone: string;
};

const CallbackModal = ({ open, setModal, className }: CallbackModalProps) => {
  const [serverError, setServerError] = useState(""); // Error state for server response
  const [serverSuccess, setServerSuccess] = useState(""); // Success state for server response

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone: "+", // Pre-fill phone with "+" to guide users
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setServerError("");
      setServerSuccess("");

      const response = await fetch("https://your-webhook-url.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setServerSuccess("Your request has been submitted successfully!");
    } catch (error) {
      setServerError("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <BaseModal open={open} setModal={setModal}>
      {serverSuccess && <span className="text-green-500">{serverSuccess}</span>}

      {!serverSuccess && (
        <div>
          <Dialog.Title className="text-2xl font-bold mb-4">
            Request a Callback
          </Dialog.Title>
          <Dialog.Description className="mb-4">
            Please fill out the form below and we will get back to you as soon
            as possible.
          </Dialog.Description>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              type="text"
              placeholder="Your Name"
              error={errors.name?.message}
              registration={register("name", { required: "Name is required" })}
              className={"border p-2"}
            />

            <FormInput
              type="tel"
              placeholder="Your Phone"
              error={errors.phone?.message}
              registration={register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+[\d\s()-]+$/,
                  message: "Phone must start with + and contain only numbers",
                },
              })}
              className={"border p-2"}
            />
            {serverError && <span className="text-red-500">{serverError}</span>}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </BaseModal>
  );
};

export default CallbackModal;
