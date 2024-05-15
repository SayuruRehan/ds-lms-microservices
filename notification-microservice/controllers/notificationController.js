const Notification = require("../models/notificationSchema");
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: process.env.SENDGRID_API_EMAIL,
    subject,
    text,
  };

  console.log(msg);

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Controller function for creating a new notification
exports.createNotification = async (req, res) => {
  try {
    const {title, message, role} = req.body;

    const newNotification = new Notification({
      title,
      message,
      role,
    });

    await newNotification.save();

    // Send email notification
    await sendEmail("kavi.fernando2001@gmail.com", title, message);

    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({message: "Error creating notification"});
  }
};
