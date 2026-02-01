const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Let the bot choose from options')
    .addStringOption(option =>
      option.setName('options')
        .setDescription('Separate choices with commas')
        .setRequired(true)),
  async execute(interaction) {
    const options = interaction.options.getString('options').split(',').map(o => o.trim()).filter(Boolean);
    if (options.length < 2) {
      return interaction.reply({ content: 'Please provide at least two options separated by commas.', ephemeral: true });
    }
    const choice = options[Math.floor(Math.random() * options.length)];
    await interaction.reply({
      embeds: [{
        title: '🤔 I choose...',
        description: `**${choice}**`,
        color: 0x57F287,
        footer: { text: 'Random choice' }
      }]
    });
  }
};
