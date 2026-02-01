const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Schedule an event or announcement')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('Time in ISO format (e.g., 2026-02-01T15:00:00)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message to send')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel to send the message in')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const time = interaction.options.getString('time');
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel');
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return interaction.reply({ content: 'Invalid time format. Use ISO format (e.g., 2026-02-01T15:00:00).', ephemeral: true });
    }
    const eventsPath = './src/events.json';
    let events = { events: [] };
    if (fs.existsSync(eventsPath)) {
      events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    }
    events.events.push({
      guild: interaction.guild.id,
      channel: channel.id,
      message,
      time: date.toISOString(),
      createdBy: interaction.user.id
    });
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
    await interaction.reply({
      embeds: [{
        title: '📅 Event Scheduled',
        description: `Event scheduled for <t:${Math.floor(date.getTime()/1000)}:F> in ${channel}`,
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Events • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
