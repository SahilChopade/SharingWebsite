const { createTransport } = require("nodemailer");
const sendMail = async (req, res) => {
  const id = req.params.id;
  const link = `http://${req.headers.host}/file/${id}`;
  console.log('This is my file link--',link);
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "chopade.sahil02@gmail.com",
      pass: "blsltzuxrdvvlpic",
    },
  });
  let info = await transporter.sendMail({
    from: `"😊😊 Sahil Chopade 😊😊" <${transporter.options.auth.user}>`, // sender address
    to: `${req.body.receiversMail}`, // list of receivers
    subject: "Download Link of a file", // Subject line
    text: "Hello world?", // plain text body
    html: `Hello Mr. User, <br> You have received the download link for the file you were looking for. <br> 
    Please find the link below,<br> <a href="${link}">${link}</a> <br>Regards <br> Sahil Chopade`, // html body
  });
  try {
    const result = await transporter.sendMail(info);
    console.log(info);
    res.send({ message: "Mail Sent", status: true });
  } catch (error) {
    console.log("Email has not Sent: ", error);
  }
};
module.exports = sendMail;
