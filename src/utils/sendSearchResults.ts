import { sendEmail } from './sendEmail';

interface HealthCenter {
  name: string;
  category: string;
  address: string;
}

export const sendSearchResults = async (
  results: HealthCenter[],
  subject: string = 'Health Center Search Results',
  onSuccess?: () => void,
  onError?: () => void
) => {
  if (!results || results.length === 0) {
    alert('You cannot share empty results via Email.');
    onError?.();
    return;
  }

  const tableRows = results
    .map(
      (center, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${center.name}</td>
        <td>${center.category}</td>
        <td>${center.address}</td>
      </tr>
    `
    )
    .join('');

  const message = `
    <p>Here are your search results for health centers:</p>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>Category</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;

  await sendEmail(subject, message, onSuccess, onError);
};
