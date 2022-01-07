export const sendEmail = async (msg: string) => {
  const message = `Hello test ${msg}`;

  try {
    const response = await fetch("/.netlify/functions/sendGrid", {
      method: "POST",
      body: JSON.stringify(message),
    });
    console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] response", response);

    if (!response.ok) {
      console.log("\x1b[41m%s \x1b[0m", "error sending email", response);
    }
  } catch (err) {
    console.log("\x1b[41m%s \x1b[0m", "error sending email", err);
  }
};
