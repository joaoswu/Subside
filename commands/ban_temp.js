const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempban')
    .setDescription('Temporarily ban a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('User to ban')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('days')
        .setDescription('Number of days to ban (1-30)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client, { logModeration }) {
    const user = interaction.options.getMember('target');
    const days = interaction.options.getInteger('days');
    if (!user) return interaction.reply({ content: 'User not found.', ephemeral: true });
    if (days < 1 || days > 30) return interaction.reply({ content: 'Days must be between 1 and 30.', ephemeral: true });
    try {
      await user.ban({ deleteMessageDays: days });
      await interaction.reply({
        embeds: [{
          title: '⏳ User Temporarily Banned',
          description: `🚫 **${user.user.tag}** was banned for ${days} day(s).`,
          color: 0xED4245,
          footer: { text: 'Moderation • Temp Ban' }
        }]
      });
      await logModeration(interaction.guild, {
        title: '⏳ User Temporarily Banned',
        description: `Moderator: <@${interaction.user.id}>\nUser: **${user.user.tag}** (${user.id})\nDuration: ${days} day(s)`,
        color: 0xED4245,
        timestamp: new Date().toISOString(),
        footer: { text: 'Moderation • Temp Ban' }
      });
      // Add to case history
      if (client.addCase) {
        client.addCase({
          type: 'tempban',
          guild: interaction.guild.id,
          user: user.id,
          moderator: interaction.user.id,
          duration: days,
          timestamp: Date.now()
        });
      }
    } catch {
      await interaction.reply({
        embeds: [{
          title: '❌ Temp Ban Failed',
          description: 'Failed to ban user.',
          color: 0xED4245,
          footer: { text: 'Moderation • Temp Ban' }
        }],
        ephemeral: true
      });
    }
  }
};
