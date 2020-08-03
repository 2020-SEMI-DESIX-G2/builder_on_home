import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import { UPDATE_CONTRACT_PAY } from '../../gql/contract';
import { useMutation } from "@apollo/client";
export default function PaypalCheckoutButton(props) {
    const order = props.order;

    const paypalConf = {
        currency: 'USD',
        env: 'sandbox',
        client: {
            sandbox: 'AbZPz-w3_7ejRjKgWiOX58-SVKFxDJnvP95ITLmXkMPsZ3K91P_tolZSPxFNpw7MeBTHw_su0DMfnPdZ',
            production: '--',
        },
        style: {
            label: 'pay',
            size: 'small', // small | medium | large | responsive
            shape: 'pill',   // pill | rect
            color: 'blue',  // gold | blue | silver | black
        },
    };

    const [updateContractPay] = useMutation(UPDATE_CONTRACT_PAY);

    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    const payment = (data, actions) => {
        const payment = {
            transactions: [
                {
                    amount: {
                        total: order.total,
                        currency: paypalConf.currency,
                    },
                    description: 'Pago de Servicio',
                    custom: order.customer || '',
                    item_list: {
                        items: order.items
                    },
                },
            ],
            note_to_payer: 'Contáctanos para cualquier aclaración sobre tu compra.',
        };

        console.log(payment);
        return actions.payment.create({
            payment,
        });
    };

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
            .then(response => {
                console.log(response);
                const result = updateContractPay({ variables: { id: props.contract.id, input: {payment: order.total,stateID: "PAYED"} } });
                const { data } = result;
                alert(`El Pago fue procesado correctamente, ID: ${response.id}`)
            })
            .catch(error => {
                console.log(error);
                alert('Ocurrió un error al procesar el pago con Paypal');
            });
    };

    const onError = (error) => {
        alert('El pago con PayPal no fue realizado, vuelva a intentarlo.');
    };

    const onCancel = (data, actions) => {
        alert('El pago con PayPal no fue realizado, el usuario canceló el proceso.');
    };


    return (
        <PayPalButton
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="es_PA"
        />

    );

}