// src/utils/__tests__/fetchHealthCenters.test.ts
import fetchHealthCenters from '../fetchHealthCenters';
import healthCentersData from '../../data/nigeriahealthfacilities.json';

jest.mock('../../data/nigeriahealthfacilities.json', () => ({
  features: [
    {
      properties: {
        name: 'Health Center 1',
        category: 'General Hospital',
        lga_name: 'Ikeja',
        state_name: 'Lagos',
      },
    },
  ],
}));

describe('fetchHealthCenters function', () => {
  it('should return formatted health center data', async () => {
    const data = await fetchHealthCenters();
    expect(data).toEqual([
      {
        name: 'Health Center 1',
        category: 'General Hospital',
        address: 'Ikeja, Lagos',
      },
    ]);
  });

  it('should throw an error if data format is invalid', async () => {
    (healthCentersData as any).features = null;
    await expect(fetchHealthCenters()).rejects.toThrow('Invalid data format');
  });
});
