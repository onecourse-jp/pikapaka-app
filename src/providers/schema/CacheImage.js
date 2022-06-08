// import Realm from 'realm';

class CacheImage {} // extends Realm.Object {}
CacheImage.schema = {
  name: 'CacheImage',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    localImageUrl: 'string',
    upstreamImageUrl: 'string',
  },
};

export default CacheImage;
