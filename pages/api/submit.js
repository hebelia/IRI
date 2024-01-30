import Airtable from "airtable";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { studentName, hoursMet, progressDescription } = req.body;

  console.log("Received data:", { studentName, hoursMet, progressDescription });

  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.error(
      "Airtable API key or Base ID is not set in environment variables"
    );
    return res.status(500).json({ error: "Server configuration error" });
  }

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

  const hoursMetNumber = parseInt(hoursMet, 10);

  base("Information").create(
    [
      {
        fields: {
          "Student Name": studentName,
          "Hours Met": hoursMetNumber,
          "Progress Description": progressDescription,
        },
      },
    ],
    (err, records) => {
      if (err) {
        console.error("Error occurred:", err);
        return res.status(500).json({
          error: "Error submitting data to AirTable",
          details: err.message,
        });
      }
      res.status(200).json({
        message: "Data submitted successfully",
        recordId: records[0].getId(),
      });
    }
  );
}
