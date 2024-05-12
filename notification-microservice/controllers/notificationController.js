const Notification = require("../models/notificationSchema");
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "yourusername@example.com",
      pass: "yourpassword",
    },
  });

  // Define email options
  let mailOptions = {
    from: "yourusername@example.com",
    to: to,
    subject: subject,
    text: text,
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};

// Controller function for creating a new notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, role } = req.body;

    const newNotification = new Notification({
      title,
      message,
      role,
    });

    await newNotification.save();

    // Send email notification
    await sendEmail(
      "recipient@example.com",
      "New Notification",
      `Title: ${title}\nMessage: ${message}`
    );

    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification" });
  }
};
