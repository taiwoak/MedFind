import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchHealthCenters from '../SearchHealthCenters';
import fetchHealthCenters from '../../utils/fetchHealthCenters';

jest.mock('../../utils/fetchHealthCenters');

const mockHealthCenters = [
  { name: 'Health Center 1', category: 'General Hospital', address: 'Ikeja, Lagos' },
  { name: 'Health Center 2', category: 'Pharmacy', address: 'Yaba, Lagos' },
];

beforeEach(() => {
  (fetchHealthCenters as jest.Mock).mockResolvedValue(mockHealthCenters);
});

describe('SearchHealthCenters Component', () => {
  it('renders search input and dropdowns', () => {
    const { getByPlaceholderText, getByText } = render(<SearchHealthCenters />);
    expect(getByPlaceholderText('Search by Name')).toBeInTheDocument();
    expect(getByText('State')).toBeInTheDocument();
    expect(getByText('Category')).toBeInTheDocument();
  });

  it('filters results based on search input', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<SearchHealthCenters />);

    fireEvent.change(getByPlaceholderText('Search by Name'), { target: { value: 'Health Center 1' } });
    fireEvent.click(getByText('Search'));

    await waitFor(() => {
      expect(getByText('Health Center 1')).toBeInTheDocument();
      expect(queryByText('Health Center 2')).not.toBeInTheDocument();
    });
  });

  it('displays all results when no filters are applied', async () => {
    const { getByText } = render(<SearchHealthCenters />);
    await waitFor(() => {
      expect(getByText('Health Center 1')).toBeInTheDocument();
      expect(getByText('Health Center 2')).toBeInTheDocument();
    });
  });
});
