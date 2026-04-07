import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOTP = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: {
        email: process.env.EMAIL,
        name: "HireLens",
      },
      subject: "Verify your email",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    const response = await sgMail.send(msg);
    console.log("Email sent:", response[0].statusCode);

  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    throw error;
  }
};