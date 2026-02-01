const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('User to ban')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client, { logModeration }) {
    const user = interaction.options.getMember('target');
    if (!user) return interaction.reply({ content: 'User not found.', ephemeral: true });
    try {
      await user.ban();
      await interaction.reply({
        embeds: [{
          title: '🔨 User Banned',
          description: `🚫 **${user.user.tag}** was banned from the server.`,
          color: 0xED4245,
          author: { name: user.user.tag, icon_url: user.user.displayAvatarURL() },
          thumbnail: { url: user.user.displayAvatarURL() },
          footer: { text: `Subside Bot • Ban • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }]
      });
      // Log moderation
      await logModeration(interaction.guild, {
        title: '🔨 User Banned',
        description: `Moderator: <@${interaction.user.id}>\nUser: **${user.user.tag}** (${user.id})`,
        color: 0xED4245,
        author: { name: user.user.tag, icon_url: user.user.displayAvatarURL() },
        thumbnail: { url: user.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Ban • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      });
    } catch {
      await interaction.reply({
        embeds: [{
          title: '❌ Ban Failed',
          description: `Failed to ban user. Please check my permissions and role hierarchy.`,
          color: 0xED4245,
          author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
          footer: { text: `Subside Bot • Ban • ${new Date().toLocaleDateString()}` },
          timestamp: new Date().toISOString()
        }],
        ephemeral: true
      });
    }
  }
};
