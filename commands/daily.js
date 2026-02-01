const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward'),
  async execute(interaction) {
    const ecoPath = './src/economy.json';
    let eco = { users: {} };
    if (fs.existsSync(ecoPath)) {
      eco = JSON.parse(fs.readFileSync(ecoPath, 'utf8'));
    }
    const userId = interaction.user.id;
    const now = Date.now();
    const userEco = eco.users[userId] || { balance: 0, lastDaily: 0 };
    if (userEco.lastDaily && now - userEco.lastDaily < 86400000) {
      return interaction.reply({ content: 'You have already claimed your daily reward. Try again later!', ephemeral: true });
    }
    userEco.balance += 100;
    userEco.lastDaily = now;
    eco.users[userId] = userEco;
    fs.writeFileSync(ecoPath, JSON.stringify(eco, null, 2));
    await interaction.reply({
      embeds: [{
        title: '🎁 Daily Reward',
        description: 'You received **100 coins**! Come back tomorrow for more.',
        color: 0x57F287,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Daily • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
