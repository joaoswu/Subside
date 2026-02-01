const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('backup')
    .setDescription('Backup all server bot data (settings, cases, xp, economy, events, giveaways, starboard)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const files = [
      'settings.json',
      'cases.json',
      'xp.json',
      'economy.json',
      'events.json',
      'giveaways.json',
      'starboard.json'
    ];
    const srcDir = './src';
    const attachments = [];
    for (const file of files) {
      const filePath = path.join(srcDir, file);
      if (fs.existsSync(filePath)) {
        attachments.push({ attachment: filePath, name: file });
      }
    }
    if (!attachments.length) {
      return interaction.reply({ content: 'No data files found to backup.', ephemeral: true });
    }
    await interaction.reply({
      embeds: [{
        title: '🗄️ Server Backup',
        description: 'Here are your server bot data files. Keep them safe!',
        color: 0x5865F2,
        footer: { text: `Subside Bot • Backup • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      files: attachments,
      ephemeral: true
    });
  }
};
