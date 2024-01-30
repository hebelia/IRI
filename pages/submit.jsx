import { useState } from "react";
import axios from "axios";
import styles from "../src/app/globals.css";

export default function Submit() {
  const [studentName, setStudentName] = useState("");
  const [hoursMet, setHoursMet] = useState("");
  const [progressDescription, setProgressDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/submit", {
      studentName,
      hoursMet,
      progressDescription,
    });
    alert("Data submitted successfully");
    window.location.href = "/submitted";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="z-10 max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://iri-nc.org/wp-content/uploads/2021/10/logo-iri-min.png"
            alt="Institution Logo"
            className="h-auto max-w-xs"
            style={{ maxHeight: "100px" }}
          />
        </div>
        <h3 className="text-lg font-semibold text-[#212F65] mb-6 mt-6">
          Please complete the fields with the corresponding data
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student's Name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00AEEF] focus:border-[#00AEEF]"
          />
          <input
            type="number"
            value={hoursMet}
            onChange={(e) => setHoursMet(e.target.value)}
            placeholder="Hours Met"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00AEEF] focus:border-[#00AEEF]"
          />
          <textarea
            value={progressDescription}
            onChange={(e) => setProgressDescription(e.target.value)}
            placeholder="Progress Description"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00AEEF] focus:border-[#00AEEF]"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#212F65] hover:bg-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AEEF]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
