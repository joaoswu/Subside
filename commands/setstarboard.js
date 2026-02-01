const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setstarboard')
    .setDescription('Set the starboard channel for this server')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel to use as starboard')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    if (!channel || channel.type !== 0) {
      return interaction.reply({ content: 'Please select a valid text channel.', ephemeral: true });
    }
    const starboardPath = './src/starboard.json';
    let starboard = { guilds: {} };
    if (fs.existsSync(starboardPath)) {
      starboard = JSON.parse(fs.readFileSync(starboardPath, 'utf8'));
    }
    starboard.guilds[interaction.guild.id] = { channel: channel.id };
    fs.writeFileSync(starboardPath, JSON.stringify(starboard, null, 2));
    await interaction.reply({
      embeds: [{
        title: '⭐ Starboard Set',
        description: `Starboard channel set to ${channel}`,
        color: 0xFEE75C,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Starboard • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
