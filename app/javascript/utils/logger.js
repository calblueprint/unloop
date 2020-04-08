import captureException from '@sentry/browser';

export function sentryCaptureException(error) {
  console.error(error);
  captureException(error);
}
