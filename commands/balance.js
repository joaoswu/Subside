const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your currency balance'),
  async execute(interaction) {
    const ecoPath = './src/economy.json';
    let eco = { users: {} };
    if (fs.existsSync(ecoPath)) {
      eco = JSON.parse(fs.readFileSync(ecoPath, 'utf8'));
    }
    const userEco = eco.users[interaction.user.id] || { balance: 0 };
    await interaction.reply({
      embeds: [{
        title: '💰 Your Balance',
        description: `Balance: **${userEco.balance}** coins`,
        color: 0xFEE75C
      }],
      ephemeral: true
    });
  }
};
