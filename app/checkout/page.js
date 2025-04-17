import CheckoutForm from '../components/Checkout/CheckoutForm'
import OrderConfirmation from '../components/Checkout/OrderConfirmation'

export default function CheckoutPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
      <CheckoutForm />
      <OrderConfirmation />
    </div>
  )
}
