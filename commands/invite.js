const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get the bot\'s invite link'),
  async execute(interaction, client) {
    const invite = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot+applications.commands&permissions=8`;
    await interaction.reply({
      embeds: [{
        title: '🔗 Invite Me!',
        description: `[Click here to invite the bot to your server!](${invite})`,
        color: 0x5865F2,
        footer: { text: 'Bot Invite' }
      }],
      ephemeral: true
    });
  }
};
