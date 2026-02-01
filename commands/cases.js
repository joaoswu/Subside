const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cases')
    .setDescription('View moderation case history for a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to view cases for')
        .setRequired(true)),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const casesPath = './src/cases.json';
    let cases = { cases: [] };
    if (fs.existsSync(casesPath)) {
      cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
    }
    const userCases = cases.cases.filter(c => c.user === user.id && c.guild === interaction.guild.id);
    if (!userCases.length) {
      return interaction.reply({ content: 'No cases found for this user.', ephemeral: true });
    }
    await interaction.reply({
      embeds: [{
        title: `📚 Case History for ${user.tag}`,
        description: userCases.map((c, i) => `#${i+1} • Type: **${c.type}** • Moderator: <@${c.moderator}> • ${c.duration ? `Duration: ${c.duration}d` : ''} • <t:${Math.floor(c.timestamp/1000)}:f>`).join('\n'),
        color: 0xED4245
      }],
      ephemeral: true
    });
  }
};
