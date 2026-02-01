const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gamble')
    .setDescription('Gamble some coins')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Amount to gamble')
        .setRequired(true)),
  async execute(interaction) {
    const ecoPath = './src/economy.json';
    let eco = { users: {} };
    if (fs.existsSync(ecoPath)) {
      eco = JSON.parse(fs.readFileSync(ecoPath, 'utf8'));
    }
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger('amount');
    const userEco = eco.users[userId] || { balance: 0 };
    if (amount < 1) return interaction.reply({ content: 'Amount must be at least 1.', ephemeral: true });
    if (userEco.balance < amount) return interaction.reply({ content: 'You do not have enough coins.', ephemeral: true });
    const win = Math.random() < 0.5;
    if (win) {
      userEco.balance += amount;
    } else {
      userEco.balance -= amount;
    }
    eco.users[userId] = userEco;
    fs.writeFileSync(ecoPath, JSON.stringify(eco, null, 2));
    await interaction.reply({
      embeds: [{
        title: win ? '🎉 You Won!' : '😢 You Lost!',
        description: win ? `You won **${amount} coins**!` : `You lost **${amount} coins**!`,
        color: win ? 0x57F287 : 0xED4245,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Gamble • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: true
    });
  }
};
