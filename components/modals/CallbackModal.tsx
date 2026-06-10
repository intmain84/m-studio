"use client";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import BaseModal from "./BaseModal";
import FormInput from "../FormInput";
import { useModal } from "@/context/ModalContext";

type FormData = {
  name: string;
  phone: string;
};

const CallbackModal = () => {
  const { modal, setModal, room, setRoom } = useModal();
  const open = modal === "book";

  const [step, setStep] = useState<"room" | "form">(room ? "form" : "room");
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(room ? "form" : "room");
      setIsSuccess(false);
      setServerError("");
    }
  }, [open, room]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { phone: "+" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setServerError("");
      const response = await fetch("https://your-webhook-url.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, room }),
      });
      if (!response.ok) throw new Error();
      setIsSuccess(true);
    } catch {
      setServerError("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <BaseModal open={open}>
      {step === "room" && (
        <div>
          <Dialog.Title className="text-2xl font-bold mb-4">
            Choose a room
          </Dialog.Title>
          <div className="flex gap-4">
            <button
              className="flex-1 border py-6"
              onClick={() => {
                setRoom("self");
                setStep("form");
              }}
            >
              Self Room
            </button>
            <button
              className="flex-1 border py-6"
              onClick={() => {
                setRoom("main");
                setStep("form");
              }}
            >
              Main Room
            </button>
          </div>
        </div>
      )}

      {step === "form" && (
        <div>
          <Dialog.Title className="text-2xl font-bold mb-4">
            Book Session{" "}
            {room && `— ${room === "self" ? "Self Room" : "Main Room"}`}
          </Dialog.Title>
          <Dialog.Description className="mb-4">
            Fill out the form and we will get back to you.
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
              className="border p-2"
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
              className="border p-2"
            />
            {serverError && <span className="text-danger">{serverError}</span>}
            <button
              type="submit"
              className="bg-primary text-primary-foreground py-2 rounded transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {isSuccess && (
        <div>
          <Dialog.Title className="text-2xl font-bold mb-4">Done!</Dialog.Title>
          <p className="text-success">
            Your request has been submitted successfully!
          </p>
        </div>
      )}
    </BaseModal>
  );
};

export default CallbackModal;
