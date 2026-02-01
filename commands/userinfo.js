const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Show information about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to get info about')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    await interaction.reply({
      embeds: [{
        title: `👤 User Info: ${user.tag}`,
        thumbnail: { url: user.displayAvatarURL({ dynamic: true, size: 256 }) },
        fields: [
          { name: '🆔 User ID', value: user.id, inline: true },
          { name: '🎂 Created', value: `<t:${Math.floor(user.createdTimestamp/1000)}:D>`, inline: true },
          { name: '🛬 Joined', value: member ? `<t:${Math.floor(member.joinedTimestamp/1000)}:D>` : 'N/A', inline: true }
        ],
        color: 0x5865F2,
        footer: { text: 'User Information' }
      }]
    });
  }
};
