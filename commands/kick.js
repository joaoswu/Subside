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
          footer: { text: 'Moderation • Kick' }
        }]
      });
      // Log moderation
      await logModeration(interaction.guild, {
        title: '👢 User Kicked',
        description: `Moderator: <@${interaction.user.id}>\nUser: **${user.user.tag}** (${user.id})`,
        color: 0xED4245,
        timestamp: new Date().toISOString(),
        footer: { text: 'Moderation • Kick' }
      });
    } catch {
      await interaction.reply({
        embeds: [{
          title: '❌ Kick Failed',
          description: 'Failed to kick user.',
          color: 0xED4245,
          footer: { text: 'Moderation • Kick' }
        }],
        ephemeral: true
      });
    }
  }
};
