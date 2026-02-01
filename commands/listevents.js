const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listevents')
    .setDescription('List all scheduled events for this server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const eventsPath = './src/events.json';
    if (!fs.existsSync(eventsPath)) {
      return interaction.reply({ content: 'No events scheduled.', ephemeral: true });
    }
    const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8')).events || [];
    const guildEvents = events.filter(e => e.guild === interaction.guild.id);
    if (guildEvents.length === 0) {
      return interaction.reply({ content: 'No events scheduled for this server.', ephemeral: true });
    }
    const embed = {
      title: '📅 Scheduled Events',
      color: 0x57F287,
      description: guildEvents.map((e, i) => `**${i+1}.** <t:${Math.floor(new Date(e.time).getTime()/1000)}:F> in <#${e.channel}>\n${e.message}`).join('\n\n'),
      footer: { text: `Subside Bot • Events • ${new Date().toLocaleDateString()}` },
      timestamp: new Date().toISOString()
    };
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
