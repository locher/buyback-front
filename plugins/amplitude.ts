import * as amplitude from '@amplitude/analytics-browser';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  amplitude.init(config.public.amplitudeApiKeyHubsideUp, undefined, {
    serverZone: 'EU',
    defaultTracking: {
      attribution: false,
      pageViews: false,
      sessions: false,
      formInteractions: false,
      fileDownloads: false,
    },
  });
  return {
    provide: {
      amplitude: amplitude,
    },
  };
});
