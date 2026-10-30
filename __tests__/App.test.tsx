/**
 * @format
 */

import { matchesDemoCredentials } from '../src/config/demoAuth';

test('demo credentials are configured for store review', () => {
  expect(matchesDemoCredentials('demo@gymvero.app', 'GymveroDemo1!')).toBe(
    true,
  );
});
