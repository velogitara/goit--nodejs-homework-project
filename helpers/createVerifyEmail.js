const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: 'email verification',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> press for confirmation</a>`,
  };
};

module.exports = createVerifyEmail;
