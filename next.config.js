const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,

  env: {
    // HOST
    HOST_API_KEY: 'https://hmsfrontend.vercel.app',
    // HOST_API_KEY: 'http://localhost:3031',
    // MAPBOX
    MAPBOX_API: '',
    MONGO_URI:"mongodb+srv://Admin:Noki@lumi@52@hms.89rftxr.mongodb.net/Travel?retryWrites=true&w=majority",
    SECRET: "Noki@lumi@52",
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination:'/auth/login',
        permanent: true,
        basePath:false
      },
    ]
  },
});
