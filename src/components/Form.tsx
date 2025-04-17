import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import Select from "react-select";
import TimezoneSelect from "react-timezone-select";

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  email: string;
  phone: string;
  timezone: string | { value: string; label: string };
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    email: "",
    phone: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [timezone, setTimezone] = useState<{ value: string; label: string }>({
    value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    label: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleTimezoneChange = (tz: { value: string; label: string }) => {
    setTimezone(tz);
    setFormData((prev) => ({
      ...prev,
      timezone: tz,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the location string
    const location = `${formData.birthPlace}`;

    // Format the date of birth
    const birthdateFormatted = new Date(formData.dob)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "-");

    const payload = {
      birthdate: birthdateFormatted,
      birthtime: formData.birthTime,
      location: location,
    };

    console.log("Sending payload to Human Design API:", payload);

    try {
      const response = await fetch(
        "https://api.humandesignapi.nl/v1/bodygraphs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "HD-Api-Key": import.meta.env.VITE_HD_API_KEY,
            "HD-Geocode-Key": import.meta.env.VITE_GEO_API_KEY,
          },
          body: JSON.stringify({
            birthdate: birthdateFormatted,
            birthtime: formData.birthTime,
            location: location,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success! Data received:", data);
        alert("Form submitted successfully!");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          value={formData.dob}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Time of Birth (24h)</label>
        <input
          type="time"
          name="birthTime"
          onChange={handleChange}
          value={formData.birthTime}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Place of Birth</label>
        <input
          type="text"
          name="birthPlace"
          onChange={handleChange}
          value={formData.birthPlace}
          placeholder="e.g. Wellington, New Zealand"
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Best Email Address</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Mobile Number</label>
        <PhoneInput
          country={"nz"}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputClass="!w-full !h-11"
          inputStyle={{
            width: "100%",
            height: "44px",
            borderRadius: "0.375rem",
          }}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          What time zone are you in?
        </label>
        <TimezoneSelect
          value={timezone}
          onChange={handleTimezoneChange}
          className="text-black"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
