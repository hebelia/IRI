import Airtable from 'airtable';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  const { email, password } = req.body;


  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);


  base('Credentials').select({
    filterByFormula: `AND({Email} = '${email}', {Password} = '${password}')`
  }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error accessing AirTable' });
    }
    if (records.length > 0) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  });
}