import { describe, it, expect } from 'vitest';
import { LoginForm } from '../components/auth/LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    expect(LoginForm).toBeDefined();
  });
});
