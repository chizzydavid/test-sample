
module.exports = ({ unRepliedMssgs, channelName }) => {
  const msgSections = []

  unRepliedMssgs.forEach((msg) => {
    let preview = msg.text.slice(0, 30)
    preview = msg.text.length > 30 ? preview += ".." : preview
    const when = msg.timestamp.toString().substring(4, 15)

    msgSections.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Preview:* ${preview}\n*When:* ${when}\n`
      }
    })

    msgSections.push({
      "type": "rich_text",
      "elements": [
        {
          "type": "rich_text_section",
          "elements": [
            {
              "type": "link",
              "url": `${msg.msgLink}`,
              "text": "View message",
              "style": {
                "bold": true
              }
            }
          ]
        }      
      ]
    })
  })

  const body = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*${unRepliedMssgs.length} Unread Messages in ${channelName} :mailbox:*`,
      }
    },
    ...msgSections
  ]
  return body
}

