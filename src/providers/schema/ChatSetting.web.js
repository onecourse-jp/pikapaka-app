// import Realm from 'realm';

class ChatSetting {} // extends Realm.Object {}
ChatSetting.schema = {
  name: 'ChatSetting',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    conversationId: 'string',
    name: 'string',
    value: 'mixed',
  },
};

export default ChatSetting;
