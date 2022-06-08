// import Realm from 'realm';

class Message {} // extends Realm.Object {}
Message.schema = {
  name: 'Message',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    content: 'string',
    contentTranslation: { type: 'string', optional: true, },
    conversationId: 'string',
    userId: 'string',
    type: 'string',
    isRead: 'bool',
    time: { type: 'date', optional: true, },
    updatedTime: { type: 'date', optional: true, },
  },
};

export default Message;
