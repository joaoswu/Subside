const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder (in minutes)')
    .addIntegerOption(option =>
      option.setName('minutes')
        .setDescription('Minutes until reminder')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Reminder message')
        .setRequired(true)),
  async execute(interaction) {
    const minutes = interaction.options.getInteger('minutes');
    const message = interaction.options.getString('message');
    await interaction.reply({
      embeds: [{
        title: '⏰ Reminder Set!',
        description: `I will remind you in **${minutes}** minute(s):\n> ${message}`,
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        footer: { text: `Subside Bot • Reminder • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
    setTimeout(() => {
      interaction.user.send({
        embeds: [{
          title: '⏰ Reminder!',
          description: message,
          color: 0xFEE75C,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
          footer: { text: `Subside Bot • Reminder • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      }).catch(() => {});
    }, minutes * 60 * 1000);
  }
};
