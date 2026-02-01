const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Show this server\'s bot settings'),
  async execute(interaction, client, { settings }) {
    const guildSettings = settings.guilds[interaction.guild.id] || {};
    await interaction.reply({
      embeds: [{
        title: '⚙️ Server Settings',
        fields: [
          { name: 'Prefix', value: guildSettings.prefix || '!', inline: true },
          { name: 'Mod Log Channel', value: guildSettings.modlog ? `<#${guildSettings.modlog}>` : 'Not set', inline: true },
          { name: 'Welcome Channel', value: guildSettings.welcome && guildSettings.welcome.channel ? `<#${guildSettings.welcome.channel}>` : 'Not set', inline: true },
          { name: 'Welcome Message', value: guildSettings.welcome && guildSettings.welcome.message ? guildSettings.welcome.message : 'Not set', inline: false }
        ],
        color: 0x5865F2
      }],
      ephemeral: true
    });
  }
};
