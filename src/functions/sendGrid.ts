import { Handler } from "@netlify/functions";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const handler: Handler = async (event) => {
  const data = JSON.parse(event.body || "");
  console.log("\x1b[42m%s \x1b[0m", "data", data);

  const mailToSend = {
    // to: "slidergs@gmail.com",
    to: "autumn@mathnasiumofnewtampa.com",
    from: "email-sender@newtamparewardcabinet.com",
    subject: "New Credit Card Information",
    html: `
    <div>
        <p>Hello, you have new credit card information from <strong>${data}</strong>.</p>

        <p>Go to the spreadsheet to update.</p>
    </div>
    `,
  };
  console.log("\x1b[42m%s \x1b[0m", "mailToSend", mailToSend);

  try {
    await sgMail.send(mailToSend);
    return {
      statusCode: 200,
      body: "Message sent successfully",
    };
  } catch (err: any) {
    console.log("\x1b[41m%s \x1b[0m", "err", err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};

export { handler };
