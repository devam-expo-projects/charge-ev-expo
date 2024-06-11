module.exports = {
    name: 'Charge EV',
    scheme: 'charge-ev',
    version: '1.0.0',
    icon: "./assets/icon.png",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        loadingIndicatorStyleExperimental: "large"
    },
    android: {
        package: "com.project.chargeev",
        config: {
            googleMaps: {
                apiKey: "AIzaSyBK3N8jLF0URASWuHcrQQtAnIJsmU3Kl-I",
            }
        }
    },
    ios: {
        bundleIdentifier: "com.project.chargeev",
    },
    extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        googleApiKey: "AIzaSyBK3N8jLF0URASWuHcrQQtAnIJsmU3Kl-I",
        eas: {
            projectId: "36b13449-c9c6-417e-b560-c3295b38c2e2",
        },
    },
};