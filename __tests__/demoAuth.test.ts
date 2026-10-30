import { matchesDemoCredentials } from '../src/config/demoAuth';

describe('demo auth', () => {
  it('accepts demo email and password', () => {
    expect(matchesDemoCredentials('demo@gymvero.app', 'GymveroDemo1!')).toBe(
      true,
    );
  });

  it('accepts demo phone', () => {
    expect(matchesDemoCredentials('9876543210', 'GymveroDemo1!')).toBe(true);
  });

  it('rejects bad password', () => {
    expect(matchesDemoCredentials('demo@gymvero.app', 'wrong')).toBe(false);
  });
});
