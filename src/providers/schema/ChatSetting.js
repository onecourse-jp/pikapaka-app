// import { BSON } from 'realm';
import Realm from 'realm';
// class ChatSetting {
//     constructor({ conversationId, name, value, _id = new BSON.ObjectId() }) {
//       this.conversationId = conversationId;
//       this._id = _id;
//       this.name = name;
//       this.value = value;
//     }
//   }

class ChatSetting {}
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
