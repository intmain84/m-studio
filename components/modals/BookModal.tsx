"use client";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import BaseModal from "./BaseModal";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import TarifOption from "@/components/ui/TarifOption";
import Stepper from "@/components/ui/Stepper";
import FormSelect from "@/components/ui/FormSelect";
import DateTimePicker from "@/components/ui/DateTimePicker";
import { useModal } from "@/context/ModalContext";
import { Room } from "@/types/modal";

const ROOM_META: Record<
  Room,
  { title: string; image: string; fromPrice: string; description: string }
> = {
  self: {
    title: "Self Room",
    image: "/spaces/selfroom.webp",
    fromPrice: "From 315 AED",
    description:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
  },
  main: {
    title: "Main Room",
    image: "/spaces/mainroom.webp",
    fromPrice: "From 1000 AED",
    description:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
  },
};

const TARIFS: Record<Room, { value: string; label: string }[]> = {
  self: [
    { value: "1h", label: "315 AED (1 hour)" },
    { value: "5h", label: "1500 AED (5 hour)" },
    { value: "10h", label: "2800 AED (10 hour)" },
  ],
  main: [
    { value: "1h", label: "1000 AED (1 hour)" },
    { value: "5h", label: "1500 AED (5 hour)" },
    { value: "10h", label: "2800 AED (10 hour)" },
  ],
};

const PRESETS = [
  { value: "bw2", label: "Black & White" },
  { value: "studio-moe", label: "My studio" },
  { value: "sweaters", label: "Sweater" },
];

type Step = "space" | "tarif" | "datetime" | "details";

type BookingData = {
  room: Room | undefined;
  tarif: string;
  people: number;
  date: string;
  time: string;
};

type DetailsForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preset: string; // managed by react-hook-form via FormSelect
};

const defaultBooking: BookingData = {
  room: undefined,
  tarif: "",
  people: 1,
  date: "",
  time: "",
};

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

export default function BookModal() {
  const { modal, setModal } = useModal();
  const open = modal?.type === "book";

  const [booking, setBooking] = useState<BookingData>(defaultBooking);
  const [steps, setSteps] = useState<Step[]>([
    "space",
    "tarif",
    "datetime",
    "details",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [reservedSlots, setReservedSlots] = useState<Record<string, number[]>>(
    {},
  );
  const [slotsLoading, setSlotsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DetailsForm>({ defaultValues: { phone: "+" } });

  useEffect(() => {
    if (modal?.type === "book") {
      const preselectedRoom = modal.room;
      const newSteps: Step[] = preselectedRoom
        ? ["tarif", "datetime", "details"]
        : ["space", "tarif", "datetime", "details"];
      setSteps(newSteps);
      setCurrentIndex(0);
      const todayStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dubai",
      }).format(new Date());
      setBooking({ ...defaultBooking, room: preselectedRoom, date: todayStr });
      setIsSuccess(false);
      setServerError("");
      reset({ phone: "+", preset: "" });
    }
  }, [open]);

  const currentStep = steps[currentIndex];

  useEffect(() => {
    if (currentStep !== "tarif" || !booking.room) return;
    setSlotsLoading(true);
    fetch(
      `https://hooks.backend.ae/webhook/api/the-m/slots?type=${booking.room}`,
    )
      .then((r) => r.json())
      .then((data) => setReservedSlots(data))
      .catch(() => {})
      .finally(() => setSlotsLoading(false));
  }, [currentStep]);

  const canGoBack = currentIndex > 0;

  const goBack = () => setCurrentIndex((i) => i - 1);
  const goNext = () => setCurrentIndex((i) => i + 1);

  const onSubmit = async (data: DetailsForm) => {
    try {
      setServerError("");
      const tarifLabel =
        (booking.room ? TARIFS[booking.room] : []).find(
          (t) => t.value === booking.tarif,
        )?.label ?? booking.tarif;
      const payload = { ...booking, ...data, tarif: tarifLabel };
      const response = await fetch(
        "https://hooks.backend.ae/webhook/api/the-m/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error();
      setIsSuccess(true);
    } catch {
      setServerError("Oops! Something went wrong. Please try again later.");
    }
  };

  const selectedRoom = booking.room;
  const roomMeta = selectedRoom ? ROOM_META[selectedRoom] : undefined;
  const selectedTarifLabel = (selectedRoom ? TARIFS[selectedRoom] : []).find(
    (t) => t.value === booking.tarif,
  )?.label;
  const tarifAmount = selectedTarifLabel?.split("(")[0]?.trim();
  const tarifDuration = selectedTarifLabel
    ? `(${selectedTarifLabel.split("(")[1]}`
    : "";

  // Room image column — same as RoomInfoModal
  const RoomImage = roomMeta ? (
    <div className="relative w-full aspect-375/240 md:aspect-auto md:w-[40%] md:h-auto shrink-0 order-first md:order-last">
      <Image
        src={roomMeta.image}
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
        isSuccess
          ? "md:w-140  md:overflow-hidden"
          : "md:w-[90vw] md:max-w-312 md:overflow-hidden"
      }
    >
      {isSuccess ? (
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
      ) : currentStep === "space" ? (
        /* ── Select Space: full width, two cards side-by-side on desktop ── */
        <div className="flex flex-col flex-1 px-6 py-6 gap-8">
          <Dialog.Title className="text-[2rem] md:text-[3.5rem] uppercase leading-[1.1]">
            Select Space
          </Dialog.Title>
          <div className="flex flex-col md:flex-row flex-1 gap-4 md:gap-6">
            {(["self", "main"] as Room[]).map((r) => {
              const meta = ROOM_META[r];
              return (
                <div
                  key={r}
                  className="group flex-1 flex flex-col cursor-pointer"
                  onClick={() => {
                    const todayStr = new Intl.DateTimeFormat("en-CA", {
                      timeZone: "Asia/Dubai",
                    }).format(new Date());
                    setBooking((b) => ({
                      ...b,
                      room: r,
                      date: todayStr,
                      time: "",
                    }));
                    goNext();
                  }}
                >
                  <div className="flex-1 flex flex-col justify-between border border-white/20 md:group-hover:border-white p-6 transition-colors duration-300">
                    {/* Mobile: title + price at top */}
                    <div className="md:hidden flex flex-col gap-2">
                      <p className="text-[1.5rem] uppercase leading-[1.1]">
                        {meta.title}
                      </p>
                      <p className="text-[0.75rem] leading-[1.1]">
                        {meta.fromPrice}
                      </p>
                    </div>
                    {/* Desktop: description at top */}
                    <p className="hidden md:block text-[0.875rem] leading-[1.4]">
                      {meta.description}
                    </p>
                    {/* Mobile: description at bottom */}
                    <p className="md:hidden text-[0.75rem] leading-[1.1]">
                      {meta.description}
                    </p>
                    {/* Desktop: title + price at bottom */}
                    <div className="hidden md:flex items-end justify-between">
                      {/* Title */}
                      <p className="text-[2.5rem] uppercase leading-[1.1]">
                        {meta.title}
                      </p>
                      <p className="text-[0.875rem] whitespace-nowrap">
                        {meta.fromPrice}
                      </p>
                    </div>
                  </div>
                  {/* Mobile: always visible; Desktop: slides in from bottom on hover */}
                  <div className="overflow-hidden md:max-h-0 md:group-hover:max-h-16 md:transition-[max-height] md:duration-300 md:ease-out">
                    <div className="w-full bg-foreground text-background px-6 py-4 text-[0.875rem] md:text-[1rem] leading-[1.1] text-center">
                      Select
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Steps with room image: content left + image right (like RoomInfoModal) ── */
        <div className="flex flex-col md:flex-row flex-1">
          <div className="flex-1 flex flex-col px-4 py-6 gap-8">
            {currentStep === "tarif" && (
              <>
                <Dialog.Title className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1]">
                  Select Tarif
                </Dialog.Title>
                <div className="flex flex-col md:gap-2">
                  {(booking.room ? TARIFS[booking.room] : []).map((t, i) => (
                    <TarifOption
                      key={t.value}
                      label={t.label}
                      selected={booking.tarif === t.value}
                      onSelect={() =>
                        setBooking((b) => ({ ...b, tarif: t.value }))
                      }
                      className="-mt-px"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[1rem] leading-[1.1] text-foreground">
                    NUMBER
                    <br />
                    OF PEOPLE
                  </p>
                  <Stepper
                    value={booking.people}
                    onChange={(v) => setBooking((b) => ({ ...b, people: v }))}
                  />
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
                    className="flex-1 px-6"
                    onClick={goNext}
                    disabled={!booking.tarif}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {currentStep === "datetime" && (
              <>
                <Dialog.Title className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1]">
                  Select Day &amp; Time
                </Dialog.Title>
                <div className="md:flex-1 md:flex md:items-center w-full">
                  <DateTimePicker
                    className="w-full"
                    selectedDate={booking.date}
                    selectedTime={booking.time}
                    onDateChange={(d) => setBooking((b) => ({ ...b, date: d }))}
                    onTimeChange={(t) => setBooking((b) => ({ ...b, time: t }))}
                    reservedSlots={reservedSlots}
                    loading={slotsLoading}
                  />
                </div>
                <div className="flex items-center gap-6 mt-auto">
                  <Button
                    variant="ghost"
                    className="w-31 flex items-center justify-between px-6"
                    onClick={goBack}
                  >
                    <ButtonArrow /> Back
                  </Button>
                  <Button
                    variant="light"
                    className="flex-1 px-6"
                    onClick={goNext}
                    disabled={!booking.date || !booking.time}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {currentStep === "details" && (
              <>
                <div className="flex flex-col gap-4">
                  <Dialog.Title className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1]">
                    Fill in Your Details
                  </Dialog.Title>
                  <div className="flex items-center justify-between text-[0.75rem] whitespace-nowrap">
                    {tarifAmount && (
                      <p className="leading-[1.1]">
                        <span className="text-foreground">{tarifAmount}</span>
                        {tarifDuration && (
                          <span className="text-foreground-muted">
                            {" "}
                            {tarifDuration}
                          </span>
                        )}
                      </p>
                    )}
                    {booking.date && booking.time && (
                      <div className="flex items-center gap-6 text-foreground leading-[1.1]">
                        <span>
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>{booking.time}</span>
                      </div>
                    )}
                  </div>
                </div>
                <form
                  className="flex flex-col gap-6 flex-1"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
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
                  <div className="flex flex-col md:flex-row gap-6">
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
                  <FormSelect
                    label="Preset"
                    placeholder="Select Preset"
                    options={PRESETS}
                    registration={register("preset", { required: "Required" })}
                    error={errors.preset?.message}
                  />
                  {serverError && (
                    <span className="text-danger text-[0.75rem]">
                      {serverError}
                    </span>
                  )}
                  <div className="flex items-center gap-6 mt-auto">
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
