const functions = require("firebase-functions");
const Filter = require("bad-words");
const admin = require("firebase-admin");
admin.initializeApp();

exports.detectEvilUsers = functions.database
  .ref("/messages/{msgId}")
  .onCreate(async (snapshot, ctx) => {
    const filter = new Filter();
    functions.logger.log("*", snapshot.val());
    const { msg, usr } = snapshot.val();

    if (filter.isProfane(msg)) {
      const cleaned = filter.clean(msg);
      return snapshot.ref.update({
        msg: `${cleaned}`,
      });
    }
  });
