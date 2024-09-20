import { MAPS_API_KEY } from '@env';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

export default function Checkout(props) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  async function handleOrder() {
    const isInitialized = await initializePaymentSheet();

    if (isInitialized) {
      await openPaymentSheet();
    }
  }

  async function openPaymentSheet() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Sucesso', 'Seu pedido/pagamento foi confirmado!!');
    }
  }

  async function initializePaymentSheet() {
    const amountInCents = Math.round(props.route.params.price * 100);

    try {
      const response = await fetch('http://10.53.52.39:3030/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar o PaymentIntent');
      }

      const { clientSecret } = data;

      if (typeof clientSecret !== 'string') {
        console.error('clientSecret não é uma string ', clientSecret);
        return false;
      }

      if (!clientSecret) {
        console.error('clientSecret não retornado !!!');
        return false;
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Navigations-Maps-Start',
        returnURL: 'myapp://home',
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        return false;
      }

      return true;

    } catch (error) {
      console.error('Error in initializePaymentSheet: ', error);
      return false;
    }
  }

  useEffect(() => {
    // Caso precise realizar alguma operação ao montar o componente, descomente e adapte aqui.
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>O valor da corrida é: {props.route.params.price}</Text>
      <Text style={styles.text}>Seu destino é: {props.route.params.address}</Text>

      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
