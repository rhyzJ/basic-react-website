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
  const {
    name,
    email,
    message,
    phone,
    timezone,
    hdSummaryLong,
    hdSummaryShort,
  } = req.body;

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

    // email to thriving
    const ownerEmail = await transporter.sendMail({
      from: `"Website Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Form Submission",
      html: `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <h2 style="color: #2c3e50;">New Form Submission from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Timezone:</strong> ${timezone}</p>
      <p><strong>Message:</strong><br>${message}</p>
      <h3 style="margin-top: 20px; color: #2c3e50;">Human Design Summary:</h3>
      ${hdSummaryLong}
    </div>
  `,
    });

    console.log("Owner email sent:", ownerEmail.messageId);

    // email to user
    const welcomeEmail = await transporter.sendMail({
      from: `"Thri5ing" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to the Thr5ing family 🌟",
      html: `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <h2 style="color: #2c3e50;">Hey ${name.split(" ")[0]}!</h2>
      <p style="margin-bottom: 12px;">
        Thanks for submitting your details. We’re <strong>thrilled</strong> to have you here!
      </p>
      <p style="margin-bottom: 12px;">
        Here's your basic profile summary based on what you submitted:
      </p>
      ${hdSummaryShort}
      <div style="text-align: center; margin: 20px 0;">
        <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*SSUv52U2amzS9DV2p25KDg@2x.jpeg" 
             alt="Thri5ing Logo" 
             style="width: 200px; height: auto; border-radius: 12px;" />
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">
        If this wasn’t you, no worries — just ignore this email. No action needed.
      </p>
    </div>
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
