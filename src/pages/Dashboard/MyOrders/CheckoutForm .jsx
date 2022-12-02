import React, { useEffect, useState } from 'react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
const CheckoutForm = ({ bookingData }) => {
    const { price, email, name, _id } = bookingData;
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch(`http://localhost:5000/create-payment-intent`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message)
        } else {
            setCardError('')
        }
        setSuccess('')
        setIsLoading(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }
        console.log(paymentIntent);
        if (paymentIntent.status === "succeeded") {
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
            }

            fetch(`http://localhost:5000/payments`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congratulation! your payment completed');
                        setTransactionId(paymentIntent.id)
                    }
                })
        }
        setIsLoading(false)
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-primary mt-5' type="submit"
                disabled={!stripe || !clientSecret || isLoading}>
                Pay
            </button>
            <p className='text-red-600 font-semibold'>{cardError}</p>
            {
                success &&
                <div>
                    <p className='text-primary font-semibold'>{success}</p>
                    <p>Your TransactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;