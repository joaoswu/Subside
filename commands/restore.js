const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restore')
    .setDescription('Restore server bot data from uploaded backup files')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    if (!interaction.isChatInputCommand() || !interaction.options) {
      return interaction.reply({ content: 'This command must be used as a slash command with file uploads.', ephemeral: true });
    }
    if (!interaction.attachments || interaction.attachments.size === 0) {
      return interaction.reply({ content: 'Please upload your backup files with this command.', ephemeral: true });
    }
    const srcDir = './src';
    let restored = [];
    for (const [, file] of interaction.attachments) {
      const filePath = path.join(srcDir, file.name);
      const response = await fetch(file.url);
      const buffer = await response.buffer();
      fs.writeFileSync(filePath, buffer);
      restored.push(file.name);
    }
    await interaction.reply({
      embeds: [{
        title: '✅ Restore Complete',
        description: `Restored files: ${restored.join(', ')}`,
        color: 0x57F287,
        footer: { text: `Subside Bot • Restore • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
