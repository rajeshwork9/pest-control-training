import { useEffect, useState } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { createSession } from "../api/Payment";

const Payment: React.FC = () => {
    const [checkoutReady, setCheckoutReady] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://test-rakbankpay.mtf.gateway.mastercard.com/static/srci/1.2.0/srci.min.js";
        script.async = true;
        script.onload = () => {
            if (window.Checkout) {
                setCheckoutReady(true);
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const startPayment = async (paymentMethod: "LIGHTBOX" | "PAYMENT_PAGE") => {
        if (!checkoutReady || !window.Checkout) {
            console.error("Checkout.js is not ready yet.");
            return;
        }

        try {
            // 🔹 Simulating API request to get a new session ID
            const sessionResponse = await createSession(20,'dss');

            console.log(sessionResponse);

            if (sessionResponse.result === "SUCCESS") {
                const sessionId = sessionResponse.session.id;

                // 🔹 Configure Checkout with the new session ID
                window.Checkout.configure({
                    session: {
                        id: sessionId,
                    },
                });
                console.log("Checkout object after configuration:", window.Checkout);
                // 🔹 Ensure Checkout functions exist before calling them
                if (paymentMethod === "LIGHTBOX" && typeof window.Checkout.showEmbeddedPage === "function") {
                    window.Checkout.showEmbeddedPage("#embedded-checkout");
                } else if (paymentMethod === "PAYMENT_PAGE" && typeof window.Checkout.showPaymentPage === "function") {
                    window.Checkout.showPaymentPage();
                } else {
                    console.error("Checkout function is not available.");
                }
            }


        } catch (error) {
            console.error("Payment initialization error:", error);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h2>Pay with Mastercard</h2>
                <IonButton
                    expand="full"
                    onClick={() => startPayment("LIGHTBOX")}
                    disabled={!checkoutReady}
                >
                    Pay with Lightbox
                </IonButton>
                <IonButton
                    expand="full"
                    onClick={() => startPayment("PAYMENT_PAGE")}
                    disabled={!checkoutReady}
                >
                    Pay with Payment Page
                </IonButton>
                <div id="embedded-checkout" style={{ marginTop: "20px", minHeight: "400px" }}></div>
            </IonContent>
        </IonPage>
    );
};

export default Payment;
