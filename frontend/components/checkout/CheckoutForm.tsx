"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import {
  cartSubtotal,
  getDemoCartItems,
  lineTotal,
  unitPrice,
} from "@/lib/cart";

const inputClass =
  "mt-2 w-full border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

const countries = [
  "United Kingdom",
  "United States",
  "Australia",
  "Canada",
  "Germany",
  "France",
];

export function CheckoutForm() {
  const items = useMemo(() => getDemoCartItems(), []);
  const [shipDifferent, setShipDifferent] = useState(false);
  const [payment, setPayment] = useState("bacs");
  const [placed, setPlaced] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");

  const subtotal = cartSubtotal(items);
  const shipping = 10;
  const total = subtotal + shipping;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlaced(true);
  }

  if (items.length === 0) {
    return (
      <div className="py-10 text-center md:py-16">
        <p className="font-display text-2xl text-ink md:text-3xl">
          Your cart is currently empty.
        </p>
        <a
          href="/shop"
          className="mt-8 inline-flex bg-ink px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold"
        >
          Return to shop
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 space-y-3 border border-line bg-[#fafafa] px-5 py-4 text-sm text-muted">
        <p>
          Returning customer?{" "}
          <a href="/my-account" className="text-ink underline-offset-2 hover:text-gold hover:underline">
            Click here to login
          </a>
        </p>
        <p>
          Have a coupon?{" "}
          <button
            type="button"
            className="text-ink underline-offset-2 hover:text-gold hover:underline"
            onClick={() => setShowCoupon((v) => !v)}
          >
            Click here to enter your code
          </button>
        </p>
        {showCoupon && (
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="w-full border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-gold sm:max-w-xs"
            />
            <button
              type="button"
              className="border border-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Apply coupon
            </button>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
      >
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Billing details
            </h2>
            <div className="mt-3 h-px w-10 bg-gold" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                First name *
                <input name="firstName" required className={inputClass} />
              </label>
              <label className={labelClass}>
                Last name *
                <input name="lastName" required className={inputClass} />
              </label>
            </div>

            <label className={`${labelClass} mt-5`}>
              Company name (optional)
              <input name="company" className={inputClass} />
            </label>

            <label className={`${labelClass} mt-5`}>
              Country / Region *
              <select name="country" required defaultValue="United Kingdom" className={inputClass}>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${labelClass} mt-5`}>
              Street address *
              <input
                name="address1"
                required
                placeholder="House number and street name"
                className={inputClass}
              />
              <input
                name="address2"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className={`${inputClass} mt-3`}
              />
            </label>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Town / City *
                <input name="city" required className={inputClass} />
              </label>
              <label className={labelClass}>
                State / County (optional)
                <input name="state" className={inputClass} />
              </label>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Postcode / ZIP *
                <input name="postcode" required className={inputClass} />
              </label>
              <label className={labelClass}>
                Phone *
                <input name="phone" type="tel" required className={inputClass} />
              </label>
            </div>

            <label className={`${labelClass} mt-5`}>
              Email address *
              <input name="email" type="email" required className={inputClass} />
            </label>

            <label className="mt-6 flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={shipDifferent}
                onChange={(e) => setShipDifferent(e.target.checked)}
              />
              Ship to a different address?
            </label>
          </section>

          {shipDifferent && (
            <section>
              <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
                Shipping details
              </h2>
              <div className="mt-3 h-px w-10 bg-gold" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  First name *
                  <input name="shippingFirstName" required={shipDifferent} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Last name *
                  <input name="shippingLastName" required={shipDifferent} className={inputClass} />
                </label>
              </div>
              <label className={`${labelClass} mt-5`}>
                Street address *
                <input
                  name="shippingAddress"
                  required={shipDifferent}
                  className={inputClass}
                />
              </label>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Town / City *
                  <input name="shippingCity" required={shipDifferent} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Postcode / ZIP *
                  <input name="shippingPostcode" required={shipDifferent} className={inputClass} />
                </label>
              </div>
            </section>
          )}

          <section>
            <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Additional information
            </h2>
            <div className="mt-3 h-px w-10 bg-gold" />
            <label className={`${labelClass} mt-6`}>
              Order notes (optional)
              <textarea
                name="notes"
                rows={5}
                placeholder="Notes about your order, e.g. special notes for delivery."
                className={`${inputClass} resize-y`}
              />
            </label>
          </section>
        </div>

        <aside className="h-fit border border-line bg-[#fafafa] p-6 md:p-7">
          <h2 className="font-display text-2xl font-medium text-ink">Your order</h2>
          <div className="mt-3 h-px w-10 bg-gold" />

          <div className="mt-6 border-b border-line pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            <div className="flex justify-between">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
          </div>

          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.product.id} className="flex items-center gap-3 py-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-white">
                  <Image
                    src={item.product.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink">
                    {item.product.name}{" "}
                    <span className="text-muted">× {item.quantity}</span>
                  </p>
                  <p className="text-xs text-muted">
                    ${unitPrice(item.product).toFixed(2)} each
                  </p>
                </div>
                <p className="text-sm font-medium text-ink">
                  ${lineTotal(item).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-2 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-ink">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="text-ink">Flat rate: ${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-base">
              <dt className="font-medium text-ink">Total</dt>
              <dd className="text-xl font-semibold text-ink">
                ${total.toFixed(2)}
              </dd>
            </div>
          </dl>

          <fieldset className="mt-7 space-y-3 border-t border-line pt-6">
            <legend className="sr-only">Payment method</legend>
            {[
              {
                id: "bacs",
                label: "Direct bank transfer",
                detail:
                  "Make your payment directly into our bank account. Please use your Order ID as the payment reference.",
              },
              {
                id: "cheque",
                label: "Check payments",
                detail: "Please send a check to Store Name, Store Street, Store Town.",
              },
              {
                id: "cod",
                label: "Cash on delivery",
                detail: "Pay with cash upon delivery.",
              },
              {
                id: "paypal",
                label: "PayPal",
                detail: "Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.",
              },
            ].map((method) => (
              <label key={method.id} className="block cursor-pointer">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                  />
                  {method.label}
                </span>
                {payment === method.id && (
                  <span className="mt-2 block border border-line bg-white px-3 py-2 text-xs leading-relaxed text-muted">
                    {method.detail}
                  </span>
                )}
              </label>
            ))}
          </fieldset>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>

          <button
            type="submit"
            className="mt-6 w-full bg-ink px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold"
          >
            Place order
          </button>

          {placed && (
            <p className="mt-4 text-sm text-gold" role="status">
              Thank you — your order has been received.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}
