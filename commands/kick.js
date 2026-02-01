const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('User to kick')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction, client, { logModeration }) {
    const user = interaction.options.getMember('target');
    if (!user) return interaction.reply({ content: 'User not found.', ephemeral: true });
    try {
      await user.kick();
      await interaction.reply({
        embeds: [{
          title: '👢 User Kicked',
          description: `👋 **${user.user.tag}** was kicked from the server.`,
          color: 0xED4245,
          author: { name: user.user.tag, icon_url: user.user.displayAvatarURL() },
          thumbnail: { url: user.user.displayAvatarURL() },
          footer: { text: `Subside Bot • Kick • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
      // Log moderation
      await logModeration(interaction.guild, {
        title: '👢 User Kicked',
        description: `Moderator: <@${interaction.user.id}>\nUser: **${user.user.tag}** (${user.id})`,
        color: 0xED4245,
        author: { name: user.user.tag, icon_url: user.user.displayAvatarURL() },
        thumbnail: { url: user.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Kick • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      });
    } catch {
      await interaction.reply({
        embeds: [{
          title: '❌ Kick Failed',
          description: `Failed to kick user. Please check my permissions and role hierarchy.`,
          color: 0xED4245,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          footer: { text: `Subside Bot • Kick • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }],
        ephemeral: true
      });
    }
  }
};
