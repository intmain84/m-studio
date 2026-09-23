import type { Metadata } from "next";
import ContainerMedium from "@/components/common/ContainerMedium";
import PaddingGlobal from "@/components/common/PaddingGlobal";
import SpacerLarge from "@/components/common/SpacerLarge";
import ContactsSection from "@/components/sections/ContactsSection";

export const metadata: Metadata = {
  title: "Terms of Service & Studio Rental Agreement — The M Studio",
  description:
    "Terms of Service and Studio Rental Agreement for The M Studio — Self Room and Main Room bookings in Dubai.",
};

export default function TermsPage() {
  return (
    <>
      <section className="mt-24 lg:mt-32">
        <PaddingGlobal>
          <ContainerMedium>
            <div className="flex flex-col gap-8 md:gap-14">
              <div className="flex flex-col gap-6 md:gap-10">
                <h1 className="text-2xl md:text-[3.5rem] text-white uppercase leading-[1.1]">
                  [Terms of Service &amp; Studio Rental Agreement]
                </h1>
                <div className="flex flex-col gap-4">
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Effective Date: [DATE] — DRAFT FOR LEGAL REVIEW
                  </p>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Please read these Terms of Service and Studio Rental
                    Agreement (&quot;Terms&quot;) carefully before booking or
                    using the website located at the-m.ae (&quot;Website&quot;)
                    or the photography studio operated by The M Studio LLC or
                    its affiliates (&quot;The M Studio&quot;, &quot;we&quot;,
                    &quot;us&quot;, &quot;our&quot;), located at Art of Living
                    Mall, Al Barsha, Dubai (&quot;Studio&quot;).
                  </p>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    These Terms apply to all visitors and users of the Website,
                    and to all clients who book or use the Studio (Self Room and
                    Main Room). By booking a session, you confirm your
                    acceptance of these Terms in full.
                  </p>
                </div>
              </div>

              <section
                aria-labelledby="eligibility-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="eligibility-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  1. Eligibility
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  To book or use the Studio, you must:
                </p>
                <ul className="flex flex-col gap-3 list-disc pl-5 text-xs md:text-sm text-white leading-[1.1]">
                  <li>
                    be at least 18 years old, or booking with the consent and
                    presence of a parent/legal guardian;
                  </li>
                  <li>
                    provide accurate and complete contact information at the
                    time of booking;
                  </li>
                  <li>
                    comply with all applicable UAE laws and regulations during
                    your visit.
                  </li>
                </ul>
              </section>

              <section
                aria-labelledby="bookings-payment-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="bookings-payment-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  2. Bookings and Payment
                </h2>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    2.1 Full Payment at Booking
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Full payment is required at the time of booking to confirm
                    your reservation. Your session date and time are not held or
                    guaranteed until payment has been received in full.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    2.2 Pricing
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Current session rates for Self Room and Main Room are
                    published on the Website and may include promotional or
                    soft-opening pricing for a limited period. All prices are
                    inclusive of UAE VAT (5%) unless stated otherwise. The M
                    Studio may update pricing at any time; the price confirmed
                    at the time of your booking will be honoured for that
                    booking.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    2.3 Guest Limits
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Self Room sessions include up to 4 guests. Each additional
                    guest is charged at AED 100 per person. Main Room bookings
                    have no guest limit or additional guest fee.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    2.4 Gift Certificates
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Gift certificates may be redeemed against any session before
                    their stated expiry date. Gift certificates are
                    non-refundable, cannot be exchanged for cash, and will not
                    be replaced if lost, stolen, or expired.
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="cancellations-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="cancellations-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  3. Cancellations, Rescheduling &amp; No-Shows
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  We understand that plans change. The following policy applies
                  to all bookings:
                </p>

                <div className="w-full overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-xs md:text-sm text-white">
                    <caption className="sr-only">
                      Cancellation and rescheduling policy by notice given
                    </caption>
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="bg-white p-2.5 text-left font-normal text-background"
                        >
                          Notice given
                        </th>
                        <th
                          scope="col"
                          className="bg-white p-2.5 text-left font-normal text-background"
                        >
                          Outcome
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-white/10 bg-white/10 p-2.5 align-top">
                          24 hours or more before your session
                        </td>
                        <td className="border-b border-white/10 bg-white/10 p-2.5 align-top">
                          Full refund, or free rescheduling to a new date/time
                          (subject to availability).
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 bg-white/10 p-2.5 align-top">
                          Less than 24 hours before your session
                        </td>
                        <td className="border-b border-white/10 bg-white/10 p-2.5 align-top">
                          50% of the session fee is retained. The remaining 50%
                          may be applied to a rescheduled session within 14
                          days, subject to availability.
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-white/10 p-2.5 align-top">
                          No-show (client does not arrive and does not notify
                          us)
                        </td>
                        <td className="bg-white/10 p-2.5 align-top">
                          100% of the session fee is retained. No rescheduling
                          or refund applies.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <aside className="border-l border-white pl-6">
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Note for legal review: this policy is intentionally more
                    client-friendly than most Dubai studio competitors, who
                    typically apply a binary full-forfeit policy at 24–168
                    hours&apos; notice. Confirm this is enforceable and
                    consistent with our payment processor&apos;s dispute rules.
                  </p>
                </aside>
              </section>

              <section
                aria-labelledby="studio-use-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="studio-use-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  4. Studio Use, Equipment &amp; Damage
                </h2>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    4.1 Permitted Use
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    The Studio and its equipment are provided strictly for the
                    photography/videography purpose booked. Clients may only use
                    the room(s) and time slot they have booked.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    4.2 Equipment &amp; Property Damage
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    You are financially responsible for any damage caused to the
                    Studio&apos;s equipment, furniture, backdrops, walls,
                    flooring, or interior during your session, whether caused by
                    you or by any guest accompanying you. Damage will be charged
                    at the full repair or replacement cost of the affected item,
                    as reasonably determined by The M Studio.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    4.3 Cleanliness
                  </h3>
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Please leave the Studio in the condition you found it.
                    Excessive mess or cleanup requirements (confetti, powders,
                    food, liquids, etc.) not disclosed at booking may incur an
                    additional cleaning fee.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="text-base md:text-xl text-white uppercase leading-[1.1]">
                    4.4 Prohibited Items
                  </h3>
                  <ul className="flex flex-col gap-3 list-disc pl-5 text-xs md:text-sm text-white leading-[1.1]">
                    <li>Smoking, vaping, and open flames of any kind;</li>
                    <li>
                      Pyrotechnics, smoke bombs, flares, or similarly hazardous
                      props;
                    </li>
                    <li>Alcohol or illegal substances;</li>
                    <li>
                      Any prop or activity not disclosed to and approved by The
                      M Studio in advance.
                    </li>
                  </ul>
                </div>
              </section>

              <section
                aria-labelledby="liability-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="liability-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  5. Self-Directed Use &amp; Limitation of Liability
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  Self Room sessions are self-directed: no photographer or staff
                  member is present in the room during your session. By booking,
                  you acknowledge and accept the following:
                </p>
                <ul className="flex flex-col gap-3 list-disc pl-5 text-xs md:text-sm text-white leading-[1.1]">
                  <li>
                    You use the Studio space, props, furniture, and equipment
                    (including cameras, remotes, and lighting) at your own risk;
                  </li>
                  <li>
                    The M Studio is not liable for any injury, accident, or
                    personal harm sustained during your session, except where
                    directly caused by The M Studio&apos;s gross negligence or
                    by equipment that The M Studio knew, or should reasonably
                    have known, to be defective;
                  </li>
                  <li>
                    You are responsible for the safety and conduct of any guest
                    accompanying you during the session;
                  </li>
                  <li>
                    If you or a member of your party requires immediate
                    assistance during a session, studio staff are reachable via
                    the in-studio contact point posted in the room.
                  </li>
                </ul>
                <aside className="border-l border-white pl-6">
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    Note for legal review: liability waivers of this kind are
                    limited under UAE Civil Code — they do not exclude liability
                    for gross negligence, wilful misconduct, or harm caused by
                    defective equipment provided by the Studio. This clause
                    should be reviewed and localized by a UAE-qualified lawyer
                    before publication.
                  </p>
                </aside>
              </section>

              <section
                aria-labelledby="consent-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="consent-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  6. Photo &amp; Video Consent
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  Unless you opt out at the time of booking, you agree that The
                  M Studio may use images or footage from your session for
                  marketing purposes (including but not limited to Instagram,
                  the Website, and printed materials), with credit given where
                  reasonably practical. You may withdraw this consent at any
                  time by written request; withdrawal will not affect content
                  already published prior to the request.
                </p>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  Where a session involves a promotional exception or
                  collaboration (e.g., complimentary retouching in exchange for
                  content usage or word-of-mouth), the specific terms agreed
                  with the client in writing (including via WhatsApp) will apply
                  in addition to this section.
                </p>
              </section>

              <section
                aria-labelledby="conduct-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="conduct-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  7. Conduct
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  The M Studio reserves the right to end a session immediately,
                  without refund, in the event of behaviour that is abusive,
                  unsafe, disruptive, or in breach of these Terms.
                </p>
              </section>

              <section
                aria-labelledby="governing-law-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="governing-law-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  8. Governing Law
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  These Terms are governed by the laws of the United Arab
                  Emirates and the Emirate of Dubai. Any dispute arising from
                  these Terms shall be subject to the exclusive jurisdiction of
                  the competent courts of Dubai.
                </p>
              </section>

              <section
                aria-labelledby="contact-heading"
                className="flex flex-col gap-6 md:gap-8"
              >
                <h2
                  id="contact-heading"
                  className="text-xl md:text-2xl text-white uppercase leading-[1.1]"
                >
                  9. Contact
                </h2>
                <p className="text-xs md:text-sm text-white leading-[1.1]">
                  For questions about these Terms, bookings, or cancellations,
                  please contact us via WhatsApp or through the Website.
                </p>
                <aside className="border-l border-white pl-6">
                  <p className="text-xs md:text-sm text-white leading-[1.1]">
                    This document is a working draft prepared for internal
                    review. Sections 3 and 5 in particular should be reviewed by
                    a UAE-qualified lawyer before publication, in line with the
                    same legal-verification practice used for The M
                    Studio&apos;s employment contract review.
                  </p>
                </aside>
              </section>
            </div>
          </ContainerMedium>
        </PaddingGlobal>
        <SpacerLarge />
      </section>

      <ContactsSection />
    </>
  );
}
