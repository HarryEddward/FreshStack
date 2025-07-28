export async function fetchData(
  url: string,
  token: string,
  method: string = "GET",
  data?: Record<string, any>
) {
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Configura las opciones de fetch
  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  // Agrega body solo si data existe
  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}

const merchantCode = "M4VHV3PT";
const checkoutReference = "HS79JHH899";
const checkoutId = "043a6a90-24e5-441a-8b60-30f46010d6d8";



async function CreateCheckout() {
  const result = await fetchData(
    "https://api.sumup.com/v0.1/checkouts",
    "sup_sk_eTgRooaCZPINxmRuJSReN3X2D2DU1KXRz",
    "POST",
    {
      "checkout_reference": checkoutReference,
      "amount": 2.1,
      "currency": "EUR",
      "merchant_code": merchantCode,
      "description": "Bocadillo de atun"
    }
  );
  console.log(result);
}

async function ViewCheckout() {
  const result = await fetchData(
    `https://api.sumup.com/v0.1/checkouts/${checkoutId}`,
    "sup_sk_eTgRooaCZPINxmRuJSReN3X2D2DU1KXRz"
  );
  console.log(result);
}

async function PaymentChackout() {
  const result = await fetchData(
    `https://api.sumup.com/v0.1/checkouts/${checkoutId}`,
    "sup_sk_eTgRooaCZPINxmRuJSReN3X2D2DU1KXRz",
    "PUT",
    {
      "payment_type": "card",
      "card": {
        "name": "Boaty McBoatface",
        "number": "4200000000000042",
        "expiry_month": "12",
        "expiry_year": "23",
        "cvv": "123"
      }
  });
  console.log(result);
}

// Ejemplo de uso
try {
  PaymentChackout();
} catch (error) {
  console.error("Error:", error);
}