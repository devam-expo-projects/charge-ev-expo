module.exports = {
    name: 'charge-ev',
    scheme: 'charge-ev',
    version: '1.0.0',
    android: {
        package: "com.project.chargeev",
    },
    ios: {
        bundleIdentifier: "com.project.chargeev",
    },
    extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        eas: {
            projectId: "36b13449-c9c6-417e-b560-c3295b38c2e2",
        },
        plugins: ['expo-font'],
    },
};