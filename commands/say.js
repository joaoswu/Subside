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
        footer: { text: 'Echo command' }
      }]
    });
  }
};
