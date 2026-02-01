const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('appeal')
    .setDescription('Submit an appeal for a moderation case')
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for your appeal')
        .setRequired(true)),
  async execute(interaction, client) {
    const reason = interaction.options.getString('reason');
    const casesPath = './src/cases.json';
    let cases = { cases: [] };
    if (fs.existsSync(casesPath)) {
      cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
    }
    // Find latest case for user
    const userCases = cases.cases.filter(c => c.user === interaction.user.id && c.guild === interaction.guild.id);
    if (!userCases.length) {
      return interaction.reply({ content: 'No moderation cases found for you in this server.', ephemeral: true });
    }
    const latestCase = userCases[userCases.length - 1];
    // Mark appeal
    latestCase.appeal = {
      reason,
      timestamp: Date.now()
    };
    fs.writeFileSync(casesPath, JSON.stringify(cases, null, 2));
    await interaction.reply({
      embeds: [{
        title: '📨 Appeal Submitted',
        description: `Your appeal for case #${userCases.length} has been submitted. Reason: ${reason}`,
        color: 0x57F287
      }],
      ephemeral: true
    });
    // Optionally notify staff/modlog channel
  }
};
