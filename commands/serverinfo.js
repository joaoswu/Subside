const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Show information about this server'),
  async execute(interaction) {
    const { guild } = interaction;
    await guild.fetch();
    const roles = guild.roles.cache.size;
    const channels = guild.channels.cache.size;
    const boosts = guild.premiumSubscriptionCount || 0;
    const boostLevel = guild.premiumTier ? `Level ${guild.premiumTier}` : 'None';
    await interaction.reply({
      embeds: [{
        title: `📊 Server Info: ${guild.name}`,
        thumbnail: { url: guild.iconURL({ dynamic: true }) },
        fields: [
          { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
          { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
          { name: '🆔 Server ID', value: guild.id, inline: true },
          { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp/1000)}:D>`, inline: true },
          { name: '🔢 Roles', value: `${roles}`, inline: true },
          { name: '💬 Channels', value: `${channels}`, inline: true },
          { name: '🚀 Boosts', value: `${boosts} (${boostLevel})`, inline: true }
        ],
        color: 0x57F287,
        footer: { text: 'Server Information' }
      }]
    });
  }
};
