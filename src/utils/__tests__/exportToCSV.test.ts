// src/utils/__tests__/exportToCSV.test.ts
import exportToCSV  from '../exportToCSV';

describe('exportToCSV utility function', () => {
  const mockData = [
    { name: 'John Doe', age: 30, occupation: 'Developer' },
    { name: 'Jane Smith', age: 25, occupation: 'Designer' }
  ];

  const mockFileName = 'test_file';

  beforeEach(() => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'mockedURL');

    // Mock the click method
    jest.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: jest.fn(),
      click: jest.fn(),
      style: {},
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate correct CSV content', () => {
    const expectedCSV = 'John Doe,30,Developer\nJane Smith,25,Designer';
    const blob = new Blob([expectedCSV], { type: 'text/csv;charset=utf-8;' });

    // Capture Blob content
    const blobConstructorSpy = jest.spyOn(global as any, 'Blob');

    exportToCSV(mockData, mockFileName);

    expect(blobConstructorSpy).toHaveBeenCalledWith([expectedCSV], { type: 'text/csv;charset=utf-8;' });
  });

  it('should trigger download with correct file name', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    const mockLink = document.createElement('a');

    (createElementSpy as jest.Mock).mockReturnValue(mockLink);

    exportToCSV(mockData, mockFileName);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'mockedURL');
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', `${mockFileName}.csv`);
    expect(mockLink.click).toHaveBeenCalled();
  });
});
