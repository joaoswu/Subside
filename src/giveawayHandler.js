const fs = require('fs');

// --- Giveaway Handler ---
const giveawaysPath = './src/giveaways.json';
let giveawaysData = { giveaways: [] };
if (fs.existsSync(giveawaysPath)) {
  giveawaysData = JSON.parse(fs.readFileSync(giveawaysPath, 'utf8'));
}

function saveGiveaways() {
  fs.writeFileSync(giveawaysPath, JSON.stringify(giveawaysData, null, 2));
}

module.exports = async function giveawayHandler(client) {
  // Listen for reactions to enter giveaways
  client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot || reaction.emoji.name !== '🎉') return;
    const messageId = reaction.message.id;
    const giveaway = giveawaysData.giveaways.find(g => g.message === messageId && g.guild === reaction.message.guild.id);
    if (!giveaway) return;
    if (!giveaway.entries.includes(user.id)) {
      giveaway.entries.push(user.id);
      saveGiveaways();
    }
  });

  // Periodically check for ended giveaways
  setInterval(async () => {
    const now = Date.now();
    const ended = giveawaysData.giveaways.filter(g => g.endTime <= now && !g.ended);
    for (const giveaway of ended) {
      const guild = client.guilds.cache.get(giveaway.guild);
      if (!guild) continue;
      const channel = guild.channels.cache.get(giveaway.channel);
      if (!channel) continue;
      let winners = [];
      const pool = [...giveaway.entries];
      for (let i = 0; i < Math.min(giveaway.winners, pool.length); i++) {
        const idx = Math.floor(Math.random() * pool.length);
        winners.push(pool.splice(idx, 1)[0]);
      }
      const embed = {
        title: '🎉 Giveaway Ended!',
        description: `Prize: **${giveaway.prize}**\nWinner(s): ${winners.length ? winners.map(id => `<@${id}>`).join(', ') : 'No valid entries.'}`,
        color: 0x57F287,
        footer: { text: `Subside Bot • Giveaways • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      };
      try {
        const msg = await channel.messages.fetch(giveaway.message);
        await msg.reply({ embeds: [embed] });
      } catch {}
      giveaway.ended = true;
      giveaway.winnersList = winners;
    }
    if (ended.length) saveGiveaways();
  }, 30000);
};
