import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Welcome to FitGear!',
      html: `
        <h1>Welcome to FitGear, ${name}!</h1>
        <p>Thank you for joining our community. Start shopping for the best fitness gear today!</p>
      `
    });
  } catch (err) {
    console.error('Email error:', err);
  }
};

export const sendOrderConfirmation = async (email, order) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order! Your order number is: ${order._id}</p>
        <p>Total Amount: KES ${order.totalAmount.toLocaleString()}</p>
      `
    });
  } catch (err) {
    console.error('Email error:', err);
  }
};