const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the avatar of a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to get avatar of')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply({
      embeds: [{
        title: `🖼️ Avatar for ${user.tag}`,
        image: { url: user.displayAvatarURL({ dynamic: true, size: 512 }) },
        color: 0x5865F2,
        footer: { text: 'Profile Picture' }
      }]
    });
  }
};
