const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the server XP leaderboard'),
  async execute(interaction) {
    const xpPath = './src/xp.json';
    let xpData = { xp: {} };
    if (fs.existsSync(xpPath)) {
      xpData = JSON.parse(fs.readFileSync(xpPath, 'utf8'));
    }
    const guildXP = xpData.xp[interaction.guild.id] || {};
    const sorted = Object.entries(guildXP)
      .sort(([, a], [, b]) => b.xp - a.xp)
      .slice(0, 10);
    if (!sorted.length) {
      return interaction.reply({ content: 'No XP data found.', ephemeral: true });
    }
    await interaction.reply({
      embeds: [{
        title: '🏆 XP Leaderboard',
        description: sorted.map(([id, data], i) => `#${i+1} <@${id}> • Level: **${data.level}** • XP: **${data.xp}**`).join('\n'),
        color: 0x5865F2,
        author: { name: interaction.guild.name, icon_url: interaction.guild.iconURL() },
        thumbnail: { url: interaction.guild.iconURL() },
        footer: { text: `Subside Bot • Leaderboard • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
