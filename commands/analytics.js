const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('analytics')
    .setDescription('Show bot analytics')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const analyticsPath = './src/analytics.json';
    let analytics = { commands: {}, messages: 0, users: {} };
    if (fs.existsSync(analyticsPath)) {
      analytics = JSON.parse(fs.readFileSync(analyticsPath, 'utf8'));
    }
    const topCommands = Object.entries(analytics.commands)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([cmd, count]) => `/${cmd}: **${count}**`).join('\n') || 'No commands used.';
    const topUsers = Object.entries(analytics.users)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, count]) => `<@${id}>: **${count}**`).join('\n') || 'No active users.';
    const topGuilds = Object.entries(analytics.guilds)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id, count]) => `Guild ID: **${id}** • Messages: **${count}**`).join('\n') || 'No guild data.';
    const topChannels = Object.entries(analytics.channels)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id, count]) => `<#${id}>: **${count}**`).join('\n') || 'No channel data.';
    const topErrors = Object.entries(analytics.errors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cmd, count]) => `/${cmd}: **${count}**`).join('\n') || 'No command errors.';
    await interaction.reply({
      embeds: [{
        title: '📊 Bot Analytics',
        fields: [
          { name: 'Total Messages', value: analytics.messages.toString(), inline: true },
          { name: 'Top Commands', value: topCommands, inline: false },
          { name: 'Top Users', value: topUsers, inline: false },
          { name: 'Top Guilds', value: topGuilds, inline: false },
          { name: 'Top Channels', value: topChannels, inline: false },
          { name: 'Command Errors', value: topErrors, inline: false }
        ],
        color: 0x5865F2
      }],
      ephemeral: true
    });
  }
};
