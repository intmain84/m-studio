"use client";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

import BaseModal from "./BaseModal";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import { useModal } from "@/context/ModalContext";
import { mainRateForHours } from "@/content/rooms";

type GiftForm = {
  name: string;
  email: string;
};

// Main Room gift certificate — fixed duration tiers, priced off the same
// brackets as a regular Main Room booking.
const GIFT_DURATIONS = [1, 5, 10];

export default function GiftModal() {
  const { modal } = useModal();
  const open = modal?.type === "gift";

  const [hours, setHours] = useState<number>(GIFT_DURATIONS[0]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GiftForm>({ defaultValues: { name: "", email: "" } });
  const details = useWatch({ control });

  // Resets the form when the modal is opened — reaction to an external
  // trigger, not state derivable during render.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHours(GIFT_DURATIONS[0]);
      setStatus("idle");
      reset({ name: "", email: "" });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const formFilled = !!details.name?.trim() && !!details.email?.trim();

  const onSubmit = handleSubmit(() => {
    try {
      // TODO: эндпоинта для сертификатов пока нет — подключить, когда бэкенд будет готов
      // const response = await fetch("https://hooks.backend.ae/webhook/api/the-m/gift", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: details.name,
      //     email: details.email,
      //     hours,
      //     amount: hours * mainRateForHours(hours),
      //   }),
      // });
      // if (!response.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  return (
    <BaseModal
      open={open}
      className={
        status !== "idle"
          ? "md:w-140 md:overflow-hidden"
          : "md:w-[90vw] md:max-w-312 md:overflow-hidden"
      }
      closeClassName="text-[#858585]"
    >
      {status === "success" ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-10.5 px-4 md:p-16 text-center">
          <Dialog.Title className="sr-only">Success</Dialog.Title>
          <svg
            className="size-20 md:size-22.5 shrink-0"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="45" cy="45" r="44" stroke="white" strokeWidth="1.5" />
            <path
              d="M28 46L39 57L62 32"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col gap-4">
            <p className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1] text-white">
              Success!
              <br />
              Check your email
            </p>
            <p className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] text-[#858585]">
              We&apos;ve sent you all the information via email. If you
              haven&apos;t received the message, please check your spam folder.
            </p>
          </div>
        </div>
      ) : status === "error" ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-10.5 px-4 md:p-16 text-center">
          <Dialog.Title className="sr-only">Error</Dialog.Title>
          <svg
            className="size-20 md:size-22.5 shrink-0"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="45" cy="45" r="44" stroke="white" strokeWidth="1.5" />
            <path
              d="M32 32L58 58M58 32L32 58"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col gap-4">
            <p className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1] text-white">
              An error occurred
            </p>
            <p className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] text-[#858585]">
              Try to verify the data you entered
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row flex-1 md:min-h-0">
          <form
            className="flex-1 flex flex-col px-4 py-6 md:p-6 gap-8 md:gap-10.5 md:min-h-0"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4 shrink-0">
              <Dialog.Title className="text-[1.5rem] md:text-[3.5rem] uppercase leading-[1.1]">
                Gift Certificate
              </Dialog.Title>
              <p className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] text-foreground-muted">
                The certificate will be sent to your specified email address.
              </p>
            </div>

            <div className="flex items-stretch shrink-0">
              {GIFT_DURATIONS.map((h) => {
                const amount = h * mainRateForHours(h);
                const selected = hours === h;
                return (
                  <Button
                    key={h}
                    type="button"
                    variant={selected ? "light" : "ghost"}
                    className="flex-1 px-6"
                    onClick={() => setHours(h)}
                  >
                    <span className="flex flex-col md:flex-row md:gap-1 items-center text-center">
                      <span>{amount.toLocaleString("en-US")} AED</span>
                      <span className="text-foreground-muted">
                        ({h} hour)
                      </span>
                    </span>
                  </Button>
                );
              })}
            </div>

            <div className="flex gap-6 shrink-0">
              <FormInput
                className="flex-1"
                variant="underline"
                label="Your Name"
                type="text"
                placeholder="Alexandra"
                error={errors.name?.message}
                registration={register("name", { required: "Required" })}
              />
              <FormInput
                className="flex-1"
                variant="underline"
                label="Your Email"
                type="email"
                placeholder="example@gmail.com"
                error={errors.email?.message}
                registration={register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
            </div>

            <Button
              type="submit"
              variant="light"
              inactive={!formFilled}
              className="w-full mt-auto"
            >
              Get Certificate
            </Button>
          </form>

          <div className="w-full aspect-375/240 md:aspect-511/430 md:w-[40%] md:h-auto bg-white shrink-0 order-first md:order-last flex items-center justify-center">
            <div className="relative w-[70%] aspect-703/446">
              <Image
                src="/certificate.avif"
                alt="Gift Certificate"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
