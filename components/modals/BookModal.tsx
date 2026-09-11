"use client";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import BaseModal from "./BaseModal";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import BirthdayInput from "@/components/ui/BirthdayInput";
import Stepper from "@/components/ui/Stepper";
import FormSelect from "@/components/ui/FormSelect";
import DateTimePicker from "@/components/ui/DateTimePicker";
import { useModal } from "@/context/ModalContext";
import { usePresets } from "@/context/PresetsContext";
import { Room } from "@/types/modal";
import { ROOMS } from "@/content/rooms";

type Step = "space" | "presets" | "datetime" | "details";

type BookingData = {
  room: Room | undefined;
  preset: string;
  people: number;
  date: string;
  times: string[];
};

type DetailsForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  occasion: string; // Self Room only
};

const defaultBooking: BookingData = {
  room: undefined,
  preset: "",
  people: 1,
  date: "",
  times: [],
};

// Backend only sends { value, label } for presets — these images are matched
// locally by value. A preset with no match falls back to a "No photo" tile.
const PRESET_IMAGES: Record<string, string> = {
  n1: "/presets/original.png",
  bw1: "/presets/bw.png",
  film1: "/presets/film-grain.png",
};

const OCCASIONS = [
  "Just because",
  "Birthday",
  "Couple / Date",
  "Friends",
  "Family",
  "Maternity",
  "Engagement",
  "Anniversary",
  "Graduation",
  "Personal branding / Content",
  "Other",
].map((label) => ({ value: label, label }));

function stepsForRoom(room: Room): Step[] {
  return room === "main"
    ? ["datetime", "details"]
    : ["presets", "datetime", "details"];
}

function parseAED(amount: string): number {
  return parseInt(amount.replace(/[^\d]/g, ""), 10) || 0;
}

function mainRateForHours(hours: number): number {
  const brackets = ROOMS.main.pricingBrackets ?? [];
  let rate = brackets[0]?.ratePerHour ?? 0;
  for (const b of brackets) {
    if (hours >= b.minHours) rate = b.ratePerHour;
  }
  return rate;
}

function ButtonArrow() {
  return (
    <svg
      width="21"
      height="15"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.292892 6.65666C-0.0976315 7.04719 -0.0976315 7.68035 0.292892 8.07088L6.65685 14.4348C7.04738 14.8254 7.68054 14.8254 8.07107 14.4348C8.46159 14.0443 8.46159 13.4111 8.07107 13.0206L2.41421 7.36377L8.07107 1.70692C8.46159 1.31639 8.46159 0.683226 8.07107 0.292702C7.68054 -0.0978227 7.04738 -0.0978227 6.65685 0.292702L0.292892 6.65666ZM21 7.36377V6.36377L1 6.36377V7.36377V8.36377L21 8.36377V7.36377Z"
        fill="white"
      />
    </svg>
  );
}

function StepProgress({ index, total }: { index: number; total: number }) {
  return (
    <div className="flex gap-3.5 items-center w-full shrink-0">
      <p className="text-xs leading-[1.1] whitespace-nowrap">
        <span className="text-white">{index + 1}</span>
        <span className="text-foreground-muted">/{total} step</span>
      </p>
      <div className="flex-1 h-px bg-white/20 relative">
        <div
          className="absolute inset-y-0 left-0 bg-white"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function BookModal() {
  const { modal } = useModal();
  const { presets } = usePresets();
  const open = modal?.type === "book"; //Fires re-rendering when modal changes

  const [booking, setBooking] = useState<BookingData>(defaultBooking);
  const [steps, setSteps] = useState<Step[]>(["space"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [reservedSlots, setReservedSlots] = useState<Record<string, number[]>>(
    {},
  );
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [presetError, setPresetError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<DetailsForm>({ defaultValues: { phone: "+" } });

  useEffect(() => {
    if (modal?.type === "book") {
      const preselectedRoom = modal.room;
      setSteps(preselectedRoom ? stepsForRoom(preselectedRoom) : ["space"]);
      setCurrentIndex(0);
      const todayStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dubai",
      }).format(new Date());
      setBooking({ ...defaultBooking, room: preselectedRoom, date: todayStr });
      setStatus("idle");
      setPresetError(false);
      setTimeError(false);
      reset({ phone: "+", birthday: "", occasion: "" });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentStep = steps[currentIndex];

  useEffect(() => {
    if (currentStep !== "datetime" || !booking.room) return;
    setSlotsLoading(true);
    fetch(
      `https://hooks.backend.ae/webhook/api/the-m/slots?type=${booking.room}`,
    )
      .then((r) => r.json())
      .then((data) => setReservedSlots(data))
      .catch(() => {})
      .finally(() => setSlotsLoading(false));
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  const canGoBack = currentIndex > 0;

  const goBack = () => setCurrentIndex((i) => i - 1);
  const goNext = () => setCurrentIndex((i) => i + 1);

  const isSelf = booking.room === "self";
  const hasSpaceStep = steps[0] === "space";
  const stepIndex = currentIndex - (hasSpaceStep ? 1 : 0);
  const stepTotal = steps.length - (hasSpaceStep ? 1 : 0);

  const slotCount = booking.times.length;
  const selfUnitAmount = parseAED(ROOMS.self.tarifs[0].amount);
  const selfUnitMinutes = parseInt(ROOMS.self.tarifs[0].duration, 10) || 0;
  const includedGuests = ROOMS.self.includedGuests ?? 0;
  const extraGuestFee = ROOMS.self.extraGuestFee ?? 0;
  const extraGuests = isSelf ? Math.max(0, booking.people - includedGuests) : 0;

  const sessionAmount = isSelf
    ? selfUnitAmount * slotCount
    : slotCount * mainRateForHours(slotCount);
  const sessionMinutes = selfUnitMinutes * slotCount;
  const totalAmount = sessionAmount + (isSelf ? extraGuests * extraGuestFee : 0);

  const priceAmountText = `${totalAmount} AED`;
  const priceDetailText = isSelf
    ? extraGuests > 0
      ? `(${sessionMinutes}min + ${extraGuests} guest${extraGuests > 1 ? "s" : ""})`
      : `(${sessionMinutes}min)`
    : `(${slotCount} hour${slotCount > 1 ? "s" : ""})`;

  const selectedPreset = presets.find((p) => p.value === booking.preset);

  const onSubmit = async (data: DetailsForm) => {
    try {
      const tarifLabel =
        slotCount > 0 ? `${priceAmountText} ${priceDetailText}` : "";
      const payload: Record<string, unknown> = {
        room: booking.room,
        tarif: tarifLabel,
        people: booking.people,
        date: booking.date,
        time: booking.times.join(" / "),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthday: data.birthday,
      };
      if (isSelf) {
        payload.preset = booking.preset;
        payload.occasion = data.occasion;
      }
      const response = await fetch(
        "https://hooks.backend.ae/webhook/api/the-m/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const selectedRoom = booking.room;
  const roomMeta = selectedRoom ? ROOMS[selectedRoom] : undefined;

  // Room image column — same as RoomInfoModal
  const RoomImage = roomMeta ? (
    <div className="relative w-full aspect-375/240 md:aspect-auto md:w-[40%] md:h-auto shrink-0 order-first md:order-last">
      <Image
        src={roomMeta.cardImage}
        alt={roomMeta.title}
        fill
        className="object-cover"
      />
      <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-[2.5rem] uppercase leading-[1.1] text-white text-center pointer-events-none">
        {roomMeta.title}
      </p>
    </div>
  ) : null;

  return (
    <BaseModal
      open={open}
      className={
        status !== "idle"
          ? "md:w-140  md:overflow-hidden"
          : "md:w-[90vw] md:max-w-312 md:h-170 md:overflow-hidden"
      }
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
      ) : currentStep === "space" ? (
        /* ── Select Space: full width, two cards side-by-side on desktop.
           The card's total height is fixed on desktop — hovering doesn't grow
           it, the photo (flex-1) shrinks to make room for the "Select" button. ── */
        <div className="flex flex-col flex-1 md:min-h-0 px-6 py-6 gap-8">
          <Dialog.Title className="shrink-0 text-[2rem] md:text-[3.5rem] uppercase leading-[1.1]">
            Select Space
          </Dialog.Title>
          <div className="flex flex-col md:flex-row flex-1 md:min-h-0 gap-4 md:gap-6">
            {(["self", "main"] as Room[]).map((r) => {
              const meta = ROOMS[r];
              const fromPrice = `From ${meta.tarifs[0].amount}`;
              return (
                <div
                  key={r}
                  className="group flex-1 flex flex-col cursor-pointer md:h-full"
                  onClick={() => {
                    const todayStr = new Intl.DateTimeFormat("en-CA", {
                      timeZone: "Asia/Dubai",
                    }).format(new Date());
                    setBooking((b) => ({
                      ...b,
                      room: r,
                      date: todayStr,
                      times: [],
                    }));
                    setSteps(["space", ...stepsForRoom(r)]);
                    goNext();
                  }}
                >
                  <div className="flex-1 min-h-0 flex flex-col gap-4 border border-white/20 md:group-hover:border-white p-6 transition-colors duration-300">
                    {/* Mobile: title + price at top */}
                    <div className="md:hidden shrink-0 flex flex-col gap-2">
                      <p className="text-[1.5rem] uppercase leading-[1.1]">
                        {meta.title}
                      </p>
                      <p className="text-[0.75rem] leading-[1.1]">
                        {fromPrice}
                      </p>
                    </div>

                    <p className="shrink-0 text-[0.875rem] leading-[1.4]">
                      {meta.selectDescription}
                    </p>

                    {/* Photo — fills whatever height is left; object-cover never distorts it */}
                    <div className="relative flex-1 min-h-37.5 md:min-h-0">
                      <Image
                        src={meta.selectImage}
                        alt={meta.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Desktop: title + price at bottom */}
                    <div className="hidden md:flex shrink-0 items-end justify-between">
                      <p className="text-[2.5rem] uppercase leading-[1.1]">
                        {meta.title}
                      </p>
                      <p className="text-[0.875rem] whitespace-nowrap">
                        {fromPrice}
                      </p>
                    </div>
                  </div>
                  {/* Mobile: always visible; desktop: reveals on hover, eating into
                      the photo's flex-1 space instead of growing the card */}
                  <div className="grid shrink-0 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:transition-[grid-template-rows] md:duration-300 md:ease-out">
                    <div className="overflow-hidden">
                      <div className="w-full bg-foreground text-background px-6 py-4 text-[0.875rem] md:text-[1rem] leading-[1.1] text-center">
                        Select
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Steps with room image: content left + image right (like RoomInfoModal) ── */
        <div className="flex flex-col md:flex-row flex-1 md:min-h-0">
          <div className="flex-1 flex flex-col px-4 py-6 gap-6 md:min-h-0">
            {currentStep === "presets" && (
              <>
                <StepProgress index={stepIndex} total={stepTotal} />
                <Dialog.Title className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1]">
                  Select Presets
                </Dialog.Title>
                <div className="flex-1 md:min-h-0 flex flex-col justify-center gap-13.5">
                  <div className="relative">
                  <div className="grid grid-cols-3 gap-2">
                    {presets.map((p) => {
                      const img = PRESET_IMAGES[p.value];
                      const selected = booking.preset === p.value;
                      return (
                        <button
                          type="button"
                          key={p.value}
                          onClick={() => {
                            setBooking((b) => ({ ...b, preset: p.value }));
                            setPresetError(false);
                          }}
                          className={`flex flex-col gap-2 items-start p-2 text-left border cursor-pointer transition-colors ${
                            selected
                              ? "border-white"
                              : "border-white/20 hover:border-white/50"
                          }`}
                        >
                          <div className="relative aspect-square w-full bg-[#d9dbda] overflow-hidden">
                            {img ? (
                              <Image
                                src={img}
                                alt={p.label}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-foreground-muted text-xs text-center px-2">
                                No photo
                              </div>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-white">
                            {p.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  {presetError && (
                    <p className="absolute left-0 top-[101%] pt-1 text-xs text-danger leading-[1.1]">
                      Please select a preset
                    </p>
                  )}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-base md:text-xl uppercase leading-[1.1]">
                        Number of people
                      </p>
                      <p className="text-xs text-foreground-muted leading-[1.1]">
                        Price includes up to {includedGuests} guests.
                        <br />
                        Each additional guest is +{extraGuestFee} AED.
                      </p>
                    </div>
                    <Stepper
                      value={booking.people}
                      onChange={(v) =>
                        setBooking((b) => ({ ...b, people: v }))
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  {canGoBack && (
                    <Button
                      variant="ghost"
                      className="w-31 flex items-center justify-between px-6"
                      onClick={goBack}
                    >
                      <ButtonArrow /> Back
                    </Button>
                  )}
                  <Button
                    variant="light"
                    className="flex-1 px-6"
                    onClick={() =>
                      booking.preset ? goNext() : setPresetError(true)
                    }
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {currentStep === "datetime" && (
              <>
                <StepProgress index={stepIndex} total={stepTotal} />
                <div className="flex flex-col gap-2">
                  <Dialog.Title className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1]">
                    Select Day &amp; Time
                  </Dialog.Title>
                  {isSelf ? (
                    <p className="text-xs md:text-base leading-[1.1]">
                      <span className="text-foreground-muted">
                        Minimum session duration:{" "}
                      </span>
                      <span className="text-white">
                        {ROOMS.self.minDuration}
                      </span>
                    </p>
                  ) : (
                    <div className="flex items-start justify-between gap-4 text-xs md:text-base text-white">
                      {ROOMS.main.tarifs.map((t) => (
                        <div
                          key={t.value}
                          className="flex flex-col gap-1 leading-[1.1] whitespace-nowrap"
                        >
                          <span>{t.value}r</span>
                          <span>
                            {t.amount}
                            {t.perHour && (
                              <span className="text-foreground-muted">
                                {" "}
                                ({t.perHour})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:flex-1 md:flex md:items-center w-full">
                  <div className="relative w-full flex flex-col gap-2">
                    <DateTimePicker
                      className="w-full"
                      selectedDate={booking.date}
                      selectedTimes={booking.times}
                      onDateChange={(d) => {
                        setBooking((b) => ({ ...b, date: d, times: [] }));
                        setTimeError(false);
                      }}
                      onTimesChange={(t) => {
                        setBooking((b) => ({ ...b, times: t }));
                        setTimeError(false);
                      }}
                      reservedSlots={reservedSlots}
                      loading={slotsLoading}
                    />
                    <p className="text-xs text-foreground-muted leading-[1.1] text-center">
                      For specific timing requests, please contact us directly
                    </p>
                    {timeError && (
                      <p className="absolute left-0 top-[101%] pt-1 w-full text-center text-xs text-danger leading-[1.1]">
                        Please select a time
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-auto">
                  {canGoBack && (
                    <Button
                      variant="ghost"
                      className="w-31 flex items-center justify-between px-6"
                      onClick={goBack}
                    >
                      <ButtonArrow /> Back
                    </Button>
                  )}
                  <Button
                    variant="light"
                    className="flex-1 px-6 flex items-center justify-between"
                    onClick={() =>
                      booking.date && slotCount > 0
                        ? goNext()
                        : setTimeError(true)
                    }
                  >
                    <span>Next</span>
                    {slotCount > 0 && (
                      <span className="text-sm">
                        {priceAmountText} {priceDetailText}
                      </span>
                    )}
                  </Button>
                </div>
              </>
            )}

            {currentStep === "details" && (
              <>
                <StepProgress index={stepIndex} total={stepTotal} />
                <div className="flex flex-col gap-4">
                  <Dialog.Title className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1]">
                    Fill in Your Details
                  </Dialog.Title>
                  <div className="flex items-center justify-between text-[0.75rem] whitespace-nowrap">
                    {slotCount > 0 && (
                      <p className="leading-[1.1]">
                        <span className="text-foreground">
                          {priceAmountText}
                        </span>{" "}
                        <span className="text-foreground-muted">
                          {priceDetailText}
                        </span>
                      </p>
                    )}
                    {booking.date && slotCount > 0 && (
                      <div className="flex items-center gap-6 text-foreground leading-[1.1]">
                        <span>
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>{booking.times.join(" / ")}</span>
                      </div>
                    )}
                  </div>
                  {isSelf && (
                    <>
                      <div className="h-px w-full bg-white/20" />
                      <div className="flex items-center justify-between text-[0.75rem]">
                        <span className="text-foreground-muted">
                          Selected preset
                        </span>
                        <span className="text-white">
                          {selectedPreset?.label ?? ""}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <form
                  className="flex flex-col flex-1 md:min-h-0"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex-1 md:min-h-0 flex flex-col justify-center gap-8">
                  <div className="flex flex-col md:flex-row gap-y-8 gap-x-10">
                    <FormInput
                      className="flex-1"
                      variant="underline"
                      label="First Name"
                      type="text"
                      placeholder="Alexandra"
                      error={errors.firstName?.message}
                      registration={register("firstName", {
                        required: "Required",
                      })}
                    />
                    <FormInput
                      className="flex-1"
                      variant="underline"
                      label="Last Name"
                      type="text"
                      placeholder="Smith"
                      error={errors.lastName?.message}
                      registration={register("lastName", {
                        required: "Required",
                      })}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-y-8 gap-x-10">
                    <FormInput
                      className="flex-1"
                      variant="underline"
                      label="Email"
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
                    <FormInput
                      className="flex-1"
                      variant="underline"
                      label="Phone"
                      type="tel"
                      placeholder="+0 0000 000 000"
                      error={errors.phone?.message}
                      registration={register("phone", {
                        required: "Required",
                        pattern: {
                          value: /^\+[\d\s()-]+$/,
                          message: "Start with + and country code",
                        },
                      })}
                    />
                  </div>
                  {isSelf ? (
                    <div className="flex flex-col md:flex-row gap-y-8 gap-x-10">
                      <Controller
                        name="birthday"
                        control={control}
                        rules={{
                          validate: (v) =>
                            v.replace(/\D/g, "").length === 8 ||
                            "Enter a full date",
                        }}
                        render={({ field }) => (
                          <BirthdayInput
                            className="flex-1"
                            label="Birthday"
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.birthday?.message}
                          />
                        )}
                      />
                      <FormSelect
                        className="flex-1"
                        label="Select occasion"
                        placeholder="Select occasion"
                        options={OCCASIONS}
                        registration={register("occasion", {
                          required: "Required",
                        })}
                        error={errors.occasion?.message}
                      />
                    </div>
                  ) : (
                    <>
                      <Controller
                        name="birthday"
                        control={control}
                        rules={{
                          validate: (v) =>
                            v.replace(/\D/g, "").length === 8 ||
                            "Enter a full date",
                        }}
                        render={({ field }) => (
                          <BirthdayInput
                            label="Birthday"
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.birthday?.message}
                          />
                        )}
                      />
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-base md:text-xl uppercase leading-[1.1]">
                          Number
                          <br />
                          of people
                        </p>
                        <Stepper
                          value={booking.people}
                          onChange={(v) =>
                            setBooking((b) => ({ ...b, people: v }))
                          }
                        />
                      </div>
                    </>
                  )}
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-31 flex items-center justify-between px-6"
                      onClick={goBack}
                    >
                      <ButtonArrow /> Back
                    </Button>
                    <Button
                      type="submit"
                      variant="light"
                      className="flex-1 px-6"
                    >
                      Book
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
          {RoomImage}
        </div>
      )}
    </BaseModal>
  );
}
