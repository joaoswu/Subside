const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('User to warn')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction, client, { logModeration }) {
    const user = interaction.options.getMember('target');
    if (!user) return interaction.reply({ content: 'User not found.', ephemeral: true });
    await interaction.reply({
      embeds: [{
        title: '⚠️ User Warned',
        description: `⚠️ **${user.user.tag}** was warned.`,
        color: 0xFEE75C,
        author: { name: user.user.tag, icon_url: user.user.displayAvatarURL() },
        thumbnail: { url: user.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Warn • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
    // Log moderation
    await logModeration(interaction.guild, {
      title: '⚠️ User Warned',
      description: `Moderator: <@${interaction.user.id}>\nUser: **${user.user.tag}** (${user.id})`,
      color: 0xFEE75C,
      author: { name: user.user.tag, icon_url: user.user.displayAvatarURL() },
      thumbnail: { url: user.user.displayAvatarURL() },
      footer: { text: `Subside Bot • Warn • ${new Date().toLocaleDateString()}` },
      timestamp: new Date().toISOString()
    });
  }
};
