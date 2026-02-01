const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reroll')
    .setDescription('Reroll winners for a giveaway')
    .addStringOption(option =>
      option.setName('messageid')
        .setDescription('Message ID of the giveaway')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const messageId = interaction.options.getString('messageid');
    const giveawaysPath = './src/giveaways.json';
    if (!fs.existsSync(giveawaysPath)) {
      return interaction.reply({ content: 'No giveaways found.', ephemeral: true });
    }
    const giveaways = JSON.parse(fs.readFileSync(giveawaysPath, 'utf8')).giveaways || [];
    const giveaway = giveaways.find(g => g.message === messageId && g.guild === interaction.guild.id);
    if (!giveaway) {
      return interaction.reply({ content: 'Giveaway not found.', ephemeral: true });
    }
    if (!giveaway.entries || giveaway.entries.length === 0) {
      return interaction.reply({ content: 'No entries to pick from.', ephemeral: true });
    }
    const winners = [];
    const pool = [...giveaway.entries];
    for (let i = 0; i < Math.min(giveaway.winners, pool.length); i++) {
      const idx = Math.floor(Math.random() * pool.length);
      winners.push(pool.splice(idx, 1)[0]);
    }
    await interaction.reply({
      embeds: [{
        title: '🎉 Giveaway Rerolled!',
        description: `New winner(s): ${winners.map(id => `<@${id}>`).join(', ')}`,
        color: 0x57F287,
        footer: { text: `Subside Bot • Giveaways • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }],
      ephemeral: false
    });
  }
};
