import { RedsysAPI, base64UrlEncode } from "./redsys.ts";

// Clave de pruebas de Redsys (SHA-256)
const secretKey = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";

// URL del TPV Virtual en el entorno de pruebas
const redsysTestUrl = "https://sis-t.redsys.es:25443/sis/realizarPago";

function prepararDatosDePago() {
    console.log("--- ESCENARIO 1: API PREPARANDO DATOS DE PAGO ---");

    const api = new RedsysAPI();

    // Parámetros de la transacción
    const merchantCode = "999008881";
    const terminal = "001";
    const amount = "1575"; // 15,75€
    const currency = "978"; // EUR
    const order = `API-REST-${Date.now()}`;
    const transactionType = "0";
    const merchantURL = "https://tu-api.com/v1/redsys/notification";
    const urlOK = "https://tu-frontend.com/payment-success";
    const urlKO = "https://tu-frontend.com/payment-failure";

    api.setParameter("DS_MERCHANT_MERCHANTCODE", merchantCode);
    api.setParameter("DS_MERCHANT_TERMINAL", terminal);
    api.setParameter("DS_MERCHANT_AMOUNT", amount);
    api.setParameter("DS_MERCHANT_CURRENCY", currency);
    api.setParameter("DS_MERCHANT_ORDER", order);
    api.setParameter("DS_MERCHANT_TRANSACTIONTYPE", transactionType);
    api.setParameter("DS_MERCHANT_MERCHANTURL", merchantURL);
    api.setParameter("DS_MERCHANT_URLOK", urlOK);
    api.setParameter("DS_MERCHANT_URLKO", urlKO);

    // ⚠️ Añadido para forzar 3DS 2.x "frictionless"
    api.setParameter("DS_MERCHANT_EMV3DS", {
        threeDSInfo: "CardData"
    });

    const dsMerchantParameters = api.createMerchantParameters();
    const dsSignature = api.createMerchantSignature(secretKey);
    const dsSignatureVersion = "HMAC_SHA256_V1";

    const paymentDataForFrontend = {
        url: redsysTestUrl,
        params: {
            Ds_SignatureVersion: dsSignatureVersion,
            Ds_MerchantParameters: dsMerchantParameters,
            Ds_Signature: dsSignature,
        },
    };

    console.log("Tu API devolvería este JSON al frontend (con 3DS 2.x frictionless):");
    console.log(JSON.stringify(paymentDataForFrontend, null, 2));

    return order;
}

function validarNotificacion(orderId: string) {
    console.log("\n--- ESCENARIO 2: API RECIBIENDO Y VALIDANDO NOTIFICACIÓN ---");

    const responseParams = {
        "Ds_Date": "19/06/2025",
        "Ds_Hour": "19:45",
        "Ds_SecurePayment": "1",
        "Ds_Amount": "1575",
        "Ds_Currency": "978",
        "Ds_Order": orderId,
        "Ds_MerchantCode": "999008881",
        "Ds_Terminal": "001",
        "Ds_Response": "0000",
        "Ds_TransactionType": "0",
        "Ds_AuthorisationCode": "123456",
        "Ds_MerchantData": "",
        "Ds_ConsumerLanguage": "1",
        "Ds_Card_Country": "724",
        "Ds_Card_Type": "D"
    };

    const apiFirma = new RedsysAPI();
    const dsParametersNotificacion = base64UrlEncode(new TextEncoder().encode(JSON.stringify(responseParams)));
    const dsSignatureNotificacion = apiFirma.createMerchantSignatureNotif(secretKey, dsParametersNotificacion);

    const notificationPayload = {
        Ds_SignatureVersion: "HMAC_SHA256_V1",
        Ds_MerchantParameters: dsParametersNotificacion,
        Ds_Signature: dsSignatureNotificacion
    };

    console.log("Payload de notificación recibido en el endpoint de la API:");
    console.log(JSON.stringify(notificationPayload, null, 2));

    const apiValidacion = new RedsysAPI();
    const nuestraSignature = apiValidacion.createMerchantSignatureNotif(
        secretKey,
        notificationPayload.Ds_MerchantParameters
    );

    console.log("\nFirma recibida:", notificationPayload.Ds_Signature);
    console.log("Firma calculada por nosotros:", nuestraSignature);

    if (nuestraSignature === notificationPayload.Ds_Signature) {
        console.log("✅ ¡FIRMA VÁLIDA! La notificación es auténtica.");
        apiValidacion.decodeMerchantParameters(notificationPayload.Ds_MerchantParameters);

        const responseCode = parseInt(apiValidacion.getParameter("Ds_Response"), 10);
        console.log(`\nProcesando pedido ${apiValidacion.getParameter("Ds_Order")}...`);
        if (responseCode >= 0 && responseCode <= 99) {
            console.log("  - Estado: PAGO CONFIRMADO.");
        } else {
            console.log("  - Estado: PAGO FALLIDO O CANCELADO.");
        }
    } else {
        console.log("❌ ¡FIRMA INVÁLIDA! Descartar la notificación.");
    }
}

function main() {
    const orderId = prepararDatosDePago();
    validarNotificacion(orderId);
}

main();
