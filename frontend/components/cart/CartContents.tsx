"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  cartSubtotal,
  getDemoCartItems,
  lineTotal,
  unitPrice,
  type CartItem,
} from "@/lib/cart";

export function CartContents() {
  const [items, setItems] = useState<CartItem[]>(() => getDemoCartItems());
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [shipping, setShipping] = useState<"flat" | "free" | "local">("flat");

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const shippingCost =
    shipping === "free" ? 0 : shipping === "local" ? 0 : 10;
  const discount =
    couponApplied === "FREESHIP" ? 0 : couponApplied === "SAVE10" ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discount) + shippingCost;

  function updateQuantity(id: string, quantity: number) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.product.id !== id));
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (code === "SAVE10" || code === "FREESHIP") {
      setCouponApplied(code);
      if (code === "FREESHIP") setShipping("free");
    } else {
      setCouponApplied(null);
    }
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
    <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
      <div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                <th className="pb-4 pr-4 font-semibold">Product</th>
                <th className="pb-4 pr-4 font-semibold">Price</th>
                <th className="pb-4 pr-4 font-semibold">Quantity</th>
                <th className="pb-4 pr-4 font-semibold">Total</th>
                <th className="pb-4 font-semibold">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const price = unitPrice(item.product);
                return (
                  <tr
                    key={item.product.id}
                    className="border-b border-line align-middle"
                  >
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-4">
                        <a
                          href="/shop"
                          className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#f4f4f4]"
                        >
                          <Image
                            src={item.product.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </a>
                        <a
                          href="/shop"
                          className="font-medium text-ink transition-colors hover:text-gold"
                        >
                          {item.product.name}
                        </a>
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-ink">${price.toFixed(2)}</td>
                    <td className="py-5 pr-4">
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="px-3 py-2 text-muted transition-colors hover:text-gold"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.product.id,
                              Number(e.target.value) || 1,
                            )
                          }
                          className="w-12 border-x border-line py-2 text-center outline-none"
                        />
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="px-3 py-2 text-muted transition-colors hover:text-gold"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-5 pr-4 font-medium text-ink">
                      ${lineTotal(item).toFixed(2)}
                    </td>
                    <td className="py-5">
                      <button
                        type="button"
                        aria-label={`Remove ${item.product.name}`}
                        className="text-muted transition-colors hover:text-gold"
                        onClick={() => removeItem(item.product.id)}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:max-w-md sm:flex-row">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="w-full border border-line px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="shrink-0 border border-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Apply coupon
            </button>
          </div>
          <button
            type="button"
            className="border border-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold"
          >
            Update cart
          </button>
        </div>

        {couponApplied && (
          <p className="mt-4 text-sm text-gold">
            Coupon “{couponApplied}” applied
            {couponApplied === "SAVE10" ? " (−10%)" : " (free shipping)"}.
          </p>
        )}
      </div>

      <aside className="h-fit border border-line bg-[#fafafa] p-6 md:p-7">
        <h2 className="font-display text-2xl font-medium text-ink">
          Cart totals
        </h2>
        <div className="mt-4 h-px w-10 bg-gold" />

        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-medium text-ink">${subtotal.toFixed(2)}</dd>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between border-b border-line pb-4">
              <dt className="text-muted">Discount</dt>
              <dd className="font-medium text-gold">−${discount.toFixed(2)}</dd>
            </div>
          )}

          <div className="border-b border-line pb-4">
            <dt className="mb-3 text-muted">Shipping</dt>
            <dd className="space-y-2">
              <label className="flex items-center gap-2 text-ink">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === "flat"}
                  onChange={() => setShipping("flat")}
                />
                Flat rate: <span className="font-medium">$10.00</span>
              </label>
              <label className="flex items-center gap-2 text-ink">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === "free"}
                  onChange={() => setShipping("free")}
                />
                Free shipping
              </label>
              <label className="flex items-center gap-2 text-ink">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === "local"}
                  onChange={() => setShipping("local")}
                />
                Local pickup
              </label>
            </dd>
          </div>

          <div className="flex items-center justify-between pt-1">
            <dt className="text-base font-medium text-ink">Total</dt>
            <dd className="text-xl font-semibold text-ink">
              ${total.toFixed(2)}
            </dd>
          </div>
        </dl>

        <a
          href="/checkout"
          className="mt-7 flex w-full items-center justify-center bg-ink px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold"
        >
          Proceed to checkout
        </a>
      </aside>
    </div>
  );
}
