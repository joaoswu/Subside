const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Text for the bot to say')
        .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('text');
    await interaction.reply({
      embeds: [{
        title: '🗣️ Bot says:',
        description: text,
        color: 0x5865F2,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        footer: { text: `Subside Bot • Say • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
