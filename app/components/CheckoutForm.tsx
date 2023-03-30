"use client"

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import formatPrice from "@/util/PriceFormat"
import { useCartStore } from "@/store"

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const cartStore = useCartStore()

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  const formattedPrice = formatPrice(totalPrice)

  useEffect(() => {
    if (!stripe) {
      return
    }
    if (!clientSecret) {
      return
    }
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success")
        }
        setIsLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="py-4 text-sm font-bold ">Total: {formattedPrice}</h1>
      <button
        className={`py-2 mt-4  w-full bg-primary rounded-md text-white disabled:opacity-25`}
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing 👀</span> : <span>Pay now 🔥</span>}
        </span>
      </button>
    </form>
  )
}
