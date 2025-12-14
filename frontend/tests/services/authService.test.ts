import { describe, it, expect } from 'vitest';
import { authService } from '../services/authService';

describe('authService', () => {
  it('should have login method', () => {
    expect(authService.login).toBeDefined();
  });

  it('should have register method', () => {
    expect(authService.register).toBeDefined();
  });
});
