import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderNav } from '@/components/layout/HeaderNav';

describe('HeaderNav and Burger Menu', () => {
  it('renders the brand title and desktop navigation items', () => {
    render(<HeaderNav />);
    expect(screen.getByText('VERITAS')).toBeDefined();
    expect(screen.getByText('Philosophy')).toBeDefined();
    expect(screen.getByText('Reference Gallery')).toBeDefined();
  });

  it('renders a mobile menu button with accessible label', () => {
    render(<HeaderNav />);
    const burgerBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(burgerBtn).toBeDefined();
    expect(burgerBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens mobile drawer when burger button is clicked and closes on close button', () => {
    render(<HeaderNav />);
    const burgerBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    
    // Open menu
    fireEvent.click(burgerBtn);
    expect(burgerBtn.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeDefined();

    // Close button
    const closeBtn = screen.getByRole('button', { name: /close navigation menu/i });
    fireEvent.click(closeBtn);
    expect(burgerBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes mobile drawer when a navigation link inside is clicked', () => {
    render(<HeaderNav />);
    const burgerBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    
    fireEvent.click(burgerBtn);
    expect(burgerBtn.getAttribute('aria-expanded')).toBe('true');

    // Find link in dialog
    const dialog = screen.getByRole('dialog', { name: /navigation menu/i });
    const links = dialog.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    
    fireEvent.click(links[0]);
    expect(burgerBtn.getAttribute('aria-expanded')).toBe('false');
  });
});
