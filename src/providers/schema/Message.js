import Realm from 'realm';

// class Message {
//   constructor({
//     conversationId,
//     userId,
//     time = new Date(),
//     text,
//     image = null,
//     _id,
//     type,
//   }) {
//     this.conversationId = conversationId;
//     this.userId = userId;
//     this.time = time;
//     this.text = text;
//     this.image = image;
//     this._id = _id;
//     this.type = type;
//   }
// }

class Message {}
Message.schema = {
  name: 'Message',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    content: 'string',
    contentTranslation: { type: 'string', optional: true },
    conversationId: 'string',
    userId: 'string',
    // partnerId: 'string',
    type: 'string',
    isRead: 'bool',
    time: { type: 'date', optional: true },
    updatedTime: { type: 'date', optional: true },
  },
};

export default Message;
