import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import axios from "axios";

dotenv.config();

console.log("Loaded env:", {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? "✅ exists" : "❌ missing",
  EMAIL_TO: process.env.EMAIL_TO,
});

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("Backend is alive and vibing! 🚀");
});

// email sending route - email to thriving for new submission
app.post("/send-email", async (req, res) => {
  console.log("Hit /send-email endpoint!");
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const test = await transporter.verify();
    console.log("Email service ready?", test);

    // Email to YOU (the owner)
    const ownerEmail = await transporter.sendMail({
      from: `"Website Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // your receiving email
      subject: "New Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    console.log("Owner email sent:", ownerEmail.messageId);

    // Email to the USER (the welcome email!)
    const welcomeEmail = await transporter.sendMail({
      from: `"Thri5ing" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to the Thr5ing family 🌟",
      html: `
        <h2>Hey ${name.split(" ")[0]}!</h2>
        <p>Thanks for submitting your details. We’re thrilled to have you here!</p>
        <p>You’ll hear back from us soon with more insights based on your birth info.</p>
        <p>In the meantime, grab a cuppa and get comfy 🫖✨</p>
        <br>
        <small>If this wasn’t you, no worries — just ignore this email.</small>
      `,
    });

    console.log("Welcome email sent:", welcomeEmail.messageId);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send emails" });
  }
});

app.post("/api/activecampaign", async (req, res) => {
  try {
    const { contact } = req.body;

    const response = await axios.post(
      "https://thri5ing.api-us1.com/api/3/contacts",
      { contact },
      {
        headers: {
          "Api-Token": process.env.VITE_AC_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return res.status(201).json({ message: "Contact added successfully" });
    } else {
      return res.status(500).json({ error: "ActiveCampaign failed" });
    }
  } catch (error) {
    console.error("Backend AC error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});


/////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
