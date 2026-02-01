const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeevent')
    .setDescription('Remove a scheduled event by its number (see /listevents)')
    .addIntegerOption(option =>
      option.setName('number')
        .setDescription('The event number to remove (from /listevents)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const number = interaction.options.getInteger('number');
    const eventsPath = './src/events.json';
    if (!fs.existsSync(eventsPath)) {
      return interaction.reply({ content: 'No events scheduled.', ephemeral: true });
    }
    let events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    const guildEvents = events.events.filter(e => e.guild === interaction.guild.id);
    if (guildEvents.length === 0) {
      return interaction.reply({ content: 'No events scheduled for this server.', ephemeral: true });
    }
    if (number < 1 || number > guildEvents.length) {
      return interaction.reply({ content: 'Invalid event number.', ephemeral: true });
    }
    // Remove the event from the main array
    const eventToRemove = guildEvents[number - 1];
    events.events = events.events.filter(e => !(e.guild === eventToRemove.guild && e.channel === eventToRemove.channel && e.time === eventToRemove.time && e.message === eventToRemove.message));
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
    await interaction.reply({
      embeds: [{
        title: '🗑️ Event Removed',
        description: `Event #${number} has been removed.`,
        color: 0xED4245,
        footer: { text: `Subside Bot • Events • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
