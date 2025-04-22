const express = require("express");
const axios = require("axios");
const router = express.Router();

const ACTIVE_CAMPAIGN_API_URL =
  "https://youraccountname.api-us1.com/api/3/contacts"; // Replace with your actual API URL
const API_KEY = import.meta.env.VITE_AC_API_KEY; 

//route to send data to ActiveCampaign
router.post("/add-contact", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    birthTime,
    timezone,
    hdData,
  } = req.body;

  try {
    const contactData = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        fieldValues: [
          {
            field: 8, 
            value: dob,
          },
          {
            field: 6, 
            value: birthTime,
          },
          {
            field: 9, 
            value: timezone,
          },
          {
            field: 1, // type
            value: JSON.stringify(hdData), // Save the HD data as a string, you can customize it
          },
          {
            field: 2, // strategy
            value: JSON.stringify(hdData), // Save the HD data as a string, you can customize it
          },
          {
            field: 3, // authority
          },
          {
            field: 4, // profile
            value: JSON.stringify(hdData), // Save the HD data as a string, you can customize it
          },
          {
            field: 5, // centers defined
            value: JSON.stringify(hdData), // Save the HD data as a string, you can customize it
          },
          
        ],
      },
    };

    // Call ActiveCampaign API to add the contact
    const response = await axios.post(ACTIVE_CAMPAIGN_API_URL, contactData, {
      headers: {
        "Api-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return res
        .status(201)
        .json({ message: "Contact successfully added to ActiveCampaign!" });
    } else {
      throw new Error("Error adding contact to ActiveCampaign.");
    }
  } catch (error) {
    console.error("Error adding contact:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the contact." });
  }
});

module.exports = router;
