import { render, fireEvent } from '@testing-library/react';
import EmailShareButton from '../EmailShareButton';

describe('EmailShareButton Component', () => {
  it('renders the email share button', () => {
    const { getByText } = render(<EmailShareButton searchParams={{ searchName: 'Test', category: '', state: '' }} />);
    expect(getByText('Share via Email')).toBeInTheDocument();
  });

  it('triggers email sharing with correct params', () => {
    const { getByText } = render(<EmailShareButton searchParams={{ searchName: 'Test', category: '', state: '' }} />);
    const button = getByText('Share via Email');

    fireEvent.click(button);
    expect(window.location.href).toContain('mailto:?subject=Check out these health centers');
  });
});
