// Sends one test email using the same settings as the website.
// Run with: node --env-file=.env.local scripts/test-email.mjs
import { Resend } from "resend";

const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL } = process.env;

if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL || !ENQUIRY_TO_EMAIL) {
  console.error("Missing values in .env.local:", {
    RESEND_API_KEY: !!RESEND_API_KEY,
    ENQUIRY_FROM_EMAIL,
    ENQUIRY_TO_EMAIL,
  });
  process.exit(1);
}

console.log(`Sending from ${ENQUIRY_FROM_EMAIL} to ${ENQUIRY_TO_EMAIL}...`);

const resend = new Resend(RESEND_API_KEY);
const { data, error } = await resend.emails.send({
  from: ENQUIRY_FROM_EMAIL,
  to: ENQUIRY_TO_EMAIL,
  subject: `Fly Fare Deal test email (${new Date().toLocaleString()})`,
  html: "<p>If you can read this, the website can email your inbox.</p>",
});

if (error) {
  console.error("Resend refused it:", error);
  process.exit(1);
}
console.log("Accepted by Resend. Email ID:", data.id);
console.log("Now check the inbox, and the Emails page in the Resend dashboard.");