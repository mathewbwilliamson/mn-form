import { Handler } from "@netlify/functions";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const handler: Handler = async (event) => {
  const data = JSON.parse(event.body || "");
  console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] data", data);

  const mailToSend = {
    to: "slidergs@gmail.com",
    // to: 'autumn@mathnasiumofnewtampa.com',
    from: "email-sender@newtamparewardcabinet.com",
    subject: "New Credit Card Information",
    html: `
    <div>
        Hello, you have new credit card information from ${data}.

        Go to <a href="http://www.google.com">Spreadsheet</a>.
    </div>
    `,
  };
  console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] main_to_send", mailToSend);

  try {
    await sgMail.send(mailToSend);
    return {
      statusCode: 200,
      body: "Message sent successfully",
    };
  } catch (err: any) {
    console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] err", err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};

export { handler };
