const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reverse')
    .setDescription('Reverse your text')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Text to reverse')
        .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('text');
    const reversed = text.split('').reverse().join('');
    await interaction.reply({
      embeds: [{
        title: '🔄 Reversed Text',
        description: reversed,
        color: 0x5865F2,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        footer: { text: `Subside Bot • Reverse • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
