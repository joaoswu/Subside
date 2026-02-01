const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Check your level and XP'),
  async execute(interaction) {
    const xpPath = './src/xp.json';
    let xpData = { xp: {} };
    if (fs.existsSync(xpPath)) {
      xpData = JSON.parse(fs.readFileSync(xpPath, 'utf8'));
    }
    const userXP = xpData.xp[interaction.guild.id]?.[interaction.user.id] || { xp: 0, level: 1 };
    await interaction.reply({
      embeds: [{
        title: '🏆 Your Level',
        description: `Level: **${userXP.level}**\nXP: **${userXP.xp}**`,
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Level • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
