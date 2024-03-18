
const { custom } = require('../../ui-interfaces');
const { getOldestTimeInRange, filterMsg } = require('../../utils');

const unRepliedMessageHandler = async ({ body, ack, client, logger }) => {
  try {
    await ack()
    const { channel_id, channel_name, user_id } = body
    const res = await client.auth.test()
    const WORKSPACE_URL = res.url;    

    let final = []
    let nextCursor;
    let fetchMore = true;
    const oldest = getOldestTimeInRange()

    do {
      let history = await client.conversations.history({
        channel: channel_id,
        limit: 100,
        cursor: nextCursor,
        oldest
      });
      fetchMore = history.has_more;
      if (fetchMore) {
        nextCursor = history.response_metadata.next_cursor
      }
      const filtered = history.messages.filter((msg) => filterMsg(msg, user_id)); 
      final = [...final, ...filtered]
    }
    while (fetchMore);

    const msgWithLinks = final.map((msg) => {
      const msgLink = `${WORKSPACE_URL}archives/${channel_id}/p${msg.ts.replace('.', "")}`;
      msg.msgLink = msgLink
      return msg
    });

    const sendMessgReq = await client.chat.postMessage({
      channel: user_id,
      text: "Unreplied Messages",
      blocks: custom.unrepliedTemplate({
        unRepliedMssgs: msgWithLinks,
        channelName: channel_name
      })
    });

    if (sendMessgReq.ok) {
      logger.info(`Unreplied messages sent successfully at ${new Date()}`)
    }
  }
  catch (error) {
    logger.error(error);
  }  
}

module.exports = { unRepliedMessageHandler };
