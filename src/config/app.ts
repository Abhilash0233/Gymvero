/** GitHub Pages site (Abhilash0233/Gymvero). Update when custom domain is live. */
const SITE = 'https://abhilash0233.github.io/Gymvero';

export const APP = {
  name: 'Gymvero',
  version: '1.0.0',
  build: 1,
  supportUrl: `${SITE}/support.html`,
  privacyUrl: `${SITE}/privacy.html`,
  termsUrl: `${SITE}/terms.html`,
  marketingUrl: SITE,
  /** Google Play requires an external account-deletion URL when accounts exist. */
  deleteAccountUrl: `${SITE}/delete-account.html`,
  deleteAccountEmail: 'privacy@gymvero.app',
  androidApplicationId: 'com.gymvero.owner',
  iosBundleId: 'app.gymvero.owner',
} as const;
