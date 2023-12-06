// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { User, Message } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a new message
app.post('/messages', async (req, res) => {
  try {
    const { senderUsername, recipientUsername, text, groupId } = req.body;
    const sender = await User.findOne({ where: { username: senderUsername } });

    if (!sender) {
      return res.status(404).json({ error: 'User not found' });
    }

    let recipient;
    if (recipientUsername) {
      recipient = await User.findOne({ where: { username: recipientUsername } });
      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }
    }

    let group;
    if (groupId) {
      group = await Group.findByPk(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
    }

    const message = await Message.create({
      text,
      SenderId: sender.id,
      RecipientId: recipient ? recipient.id : null,
      GroupId: group ? group.id : null,
    });

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all messages between two users
app.get('/messages/:senderUsername/:recipientUsername', async (req, res) => {
  try {
    const { senderUsername, recipientUsername } = req.params;
    const sender = await User.findOne({ where: { username: senderUsername } });
    const recipient = await User.findOne({ where: { username: recipientUsername } });

    if (!sender || !recipient) {
      return res.status(404).json({ error: 'User not found' });
    }

    const messages = await Message.findAll({
      where: {
        $or: [
          { SenderId: sender.id, RecipientId: recipient.id },
          { SenderId: recipient.id, RecipientId: sender.id },
        ],
        GroupId: null, // Exclude group messages
      },
      include: [
        { model: User, as: 'Sender', attributes: ['username'] },
        { model: User, as: 'Recipient', attributes: ['username'] },
      ],
      order: [['createdAt', 'ASC']], // Order by creation time
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
