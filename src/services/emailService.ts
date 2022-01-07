export const sendEmail = async (msg: string) => {
  try {
    const response = await fetch("/.netlify/functions/sendGrid", {
      method: "POST",
      body: JSON.stringify(msg),
    });

    if (!response.ok) {
      console.log("\x1b[41m%s \x1b[0m", "error sending email", response);
    }
  } catch (err) {
    console.log("\x1b[41m%s \x1b[0m", "error sending email", err);
  }
};
