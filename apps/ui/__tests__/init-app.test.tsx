import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ComposedApp } from '@app/app/app';

describe('init ui', () => {
  it('must render app', () => {
    render(<ComposedApp />);
  });
});
