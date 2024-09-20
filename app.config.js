// app.config.js ou app.json

export default {
    expo: {
        name: "navigation-maps",
        slug: "navigation-maps",
        extra: {
            stripePublicKey:  process.env.STRIPE_PUBLIC_KEY
        },
        orientation: "portrait",
        icon: "./assets/images/icon.png",
    }
}