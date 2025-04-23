import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import Select from "react-select";
import TimezoneSelect from "react-timezone-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
  // const [hdResult, setHdResult] = useState<any>(null);

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
    setIsLoading(true);

    const location = `${formData.birthPlace}`;

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
      location,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
    };

    try {
      // Step 1: Call HD API first
      const hdResponse = await fetch(
        "https://api.humandesignapi.nl/v1/bodygraphs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "HD-Api-Key": import.meta.env.VITE_HD_API_KEY,
            "HD-Geocode-Key": import.meta.env.VITE_GEO_API_KEY,
          },
          body: JSON.stringify({
            birthdate: payload.birthdate,
            birthtime: payload.birthtime,
            location: payload.location,
          }),
        }
      );

      if (!hdResponse.ok) throw new Error("HD API request failed");

      const hdData = await hdResponse.json();
      console.log("HD API Success:", hdData);

      const activationsString = JSON.stringify(hdData.activations);
      console.log(activationsString); // Log the stringified activations

      // Extract other HD data
      const {
        type,
        profile,
        channels_short,
        centers,
        strategy,
        authority,
        incarnation_cross,
        definition,
        signature,
        not_self_theme,
        cognition,
        determination,
        variables,
        motivation,
        transference,
        perspective,
        distraction,
        circuitries,
        channels_long,
        gates,
      } = hdData;

      const hdSummaryLong = `
        <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
          <tr><td style="padding: 8px; font-weight: bold;">Type:</td><td>${type}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Profile:</td><td>${profile}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Strategy:</td><td>${strategy}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Authority:</td><td>${authority}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Definition:</td><td>${definition}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Incarnation Cross:</td><td>${incarnation_cross}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Signature:</td><td>${signature}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Not-self Theme:</td><td>${not_self_theme}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Channels:</td><td>${channels_short?.join(
            ", "
          )}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Centers:</td><td>${centers?.join(
            ", "
          )}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Cognition:</td><td>${cognition}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Perspective:</td><td>${perspective}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Motivation:</td><td>${motivation}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Transference:</td><td>${transference}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Distraction:</td><td>${distraction}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Circuitries:</td><td>${circuitries}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Gates:</td><td>${gates?.join(
            ", "
          )}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Variables:</td><td>${variables}</td></tr>
        </table>
    `;
      const hdSummaryShort = `
        <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px; margin-top: 10px;">
          <tr><td style="padding: 6px; font-weight: bold;">Type:</td><td>${type}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold;">Profile:</td><td>${profile}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold;">Strategy:</td><td>${strategy}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold;">Authority:</td><td>${authority}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold;">Signature:</td><td>${signature}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold;">Not-self Theme:</td><td>${not_self_theme}</td></tr>
        </table>
      `;

      // Step 2: Send email with HD data
      const emailResponse = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          phone: formData.phone,
          timezone: timezone.label,
          message: `New submission from ${formData.firstName} ${formData.lastName}`,
          hdSummaryLong,
          hdSummaryShort,
        }),
      });

      if (!emailResponse.ok) throw new Error("Email request failed");

      // Step 3: Send data to ActiveCampaign
      const activeCampaignData = {
        contact: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          fieldValues: [
            { field: 8, value: formData.dob },
            { field: 6, value: formData.birthTime },
            { field: 7, value: formData.birthPlace },
            { field: 9, value: timezone.label },
            { field: 1, value: type },
            { field: 4, value: profile },
            { field: 22, value: channels_short?.join(", ") },
            { field: 5, value: centers?.join(", ") },
            { field: 2, value: strategy },
            { field: 3, value: authority },
            { field: 10, value: incarnation_cross },
            { field: 11, value: definition },
            { field: 12, value: signature },
            { field: 13, value: not_self_theme },
            { field: 14, value: cognition },
            { field: 15, value: determination },
            { field: 16, value: variables },
            { field: 17, value: motivation },
            { field: 18, value: transference },
            { field: 19, value: perspective },
            { field: 20, value: distraction },
            { field: 21, value: circuitries },
            { field: 23, value: channels_long?.join(", ") },
            { field: 24, value: gates?.join(", ") },
            { field: 25, value: activationsString },
          ],
        },
      };

      // Send the request to ActiveCampaign
      const activeCampaignResponse = await axios.post(
        "http://localhost:3000/api/activecampaign",
        activeCampaignData
      );

      if (activeCampaignResponse.status === 201) {
        console.log("Contact successfully added to ActiveCampaign!");
      } else {
        throw new Error("Error adding contact to ActiveCampaign.");
      }

      toast.success("Form submitted and email sent!");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200 flex justify-center items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Calculating your chart...
                <DotLottieReact
                  className="w-15 h-15"
                  src="https://lottie.host/8450e337-1ab7-4df7-8b45-152cc03733ba/gwDRlfi3nl.lottie"
                  loop
                  autoplay
                />
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Form;
