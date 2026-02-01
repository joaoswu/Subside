const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user for 10 minutes')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('User to mute')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction, client, { logModeration }) {
    const user = interaction.options.getMember('target');
    if (!user) return interaction.reply({ content: 'User not found.', ephemeral: true });
    try {
      await user.timeout(10 * 60 * 1000); // 10 min
      await interaction.reply({
        embeds: [{
          title: '🔇 User Muted',
          description: `🤫 **${user.user.tag}** was muted for 10 minutes.`,
          color: 0xED4245,
          footer: { text: 'Moderation • Mute' }
        }]
      });
      // Log moderation
      await logModeration(interaction.guild, {
        title: '🔇 User Muted',
        description: `Moderator: <@${interaction.user.id}>\nUser: **${user.user.tag}** (${user.id})\nDuration: 10 minutes`,
        color: 0xED4245,
        timestamp: new Date().toISOString(),
        footer: { text: 'Moderation • Mute' }
      });
    } catch {
      await interaction.reply({
        embeds: [{
          title: '❌ Mute Failed',
          description: 'Failed to mute user.',
          color: 0xED4245,
          footer: { text: 'Moderation • Mute' }
        }],
        ephemeral: true
      });
    }
  }
};
