const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  // console.log(req.file);
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    console.log(resultUpload);
    console.log(tempUpload);
    const img = await jimp.read(tempUpload);
    await img
      .autocrop()
      .cover(240, 240, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(tempUpload);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink;
    throw error;
  }
};

module.exports = updateAvatar;
