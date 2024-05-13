const Notification = require("../models/notificationSchema");
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: "udanthagunathilaka2020@gmail.com", // Ensure this email address is verified in your SendGrid account
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
    await sendEmail("udanthaisuru@gmail.com", title, message);

    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({message: "Error creating notification"});
  }
};