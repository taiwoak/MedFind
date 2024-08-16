import { render, fireEvent } from '@testing-library/react';
import AddHealthCenter from '../AddHealthCenter';
import { addDoc } from 'firebase/firestore';
import { auth } from '../../firebase';

jest.mock('firebase/firestore');
jest.mock('../../firebase');

describe('AddHealthCenter Component', () => {
  it('renders the form fields correctly', () => {
    const { getByPlaceholderText } = render(<AddHealthCenter />);
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Address')).toBeInTheDocument();
    expect(getByPlaceholderText('Category')).toBeInTheDocument();
  });

  it('submits the form data', async () => {
    const mockUser = { uid: '12345' };
    (auth.currentUser as any) = mockUser;

    const { getByPlaceholderText, getByText } = render(<AddHealthCenter />);

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Health Center Test' } });
    fireEvent.change(getByPlaceholderText('Address'), { target: { value: 'Test Address' } });
    fireEvent.change(getByPlaceholderText('Category'), { target: { value: 'General Hospital' } });

    fireEvent.click(getByText('Add Health Center'));

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: 'Health Center Test',
      address: 'Test Address',
      category: 'General Hospital',
      createdBy: '12345',
      createdAt: expect.any(Date),
    });
  });
});
