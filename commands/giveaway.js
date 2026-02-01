const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Start a giveaway in a channel')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel to host the giveaway in')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('prize')
        .setDescription('Prize for the giveaway')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('winners')
        .setDescription('Number of winners')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in minutes')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const prize = interaction.options.getString('prize');
    const winners = interaction.options.getInteger('winners');
    const duration = interaction.options.getInteger('duration');
    if (winners < 1 || winners > 20) {
      return interaction.reply({ content: 'Number of winners must be between 1 and 20.', ephemeral: true });
    }
    if (duration < 1 || duration > 10080) {
      return interaction.reply({ content: 'Duration must be between 1 and 10080 minutes (7 days).', ephemeral: true });
    }
    const giveawaysPath = './src/giveaways.json';
    let giveaways = { giveaways: [] };
    if (fs.existsSync(giveawaysPath)) {
      giveaways = JSON.parse(fs.readFileSync(giveawaysPath, 'utf8'));
    }
    const endTime = Date.now() + duration * 60000;
    const giveaway = {
      guild: interaction.guild.id,
      channel: channel.id,
      prize,
      winners,
      endTime,
      startedBy: interaction.user.id,
      entries: []
    };
    giveaways.giveaways.push(giveaway);
    fs.writeFileSync(giveawaysPath, JSON.stringify(giveaways, null, 2));
    const embed = {
      title: '🎉 Giveaway!',
      description: `Prize: **${prize}**\nReact with 🎉 to enter!\nEnds <t:${Math.floor(endTime/1000)}:R>\nNumber of winners: **${winners}**` ,
      color: 0xFEE75C,
      footer: { text: `Subside Bot • Giveaways • ${new Date().toLocaleDateString()}` },
      timestamp: new Date().toISOString()
    };
    const msg = await channel.send({ embeds: [embed] });
    await msg.react('🎉');
    giveaway.message = msg.id;
    fs.writeFileSync(giveawaysPath, JSON.stringify(giveaways, null, 2));
    await interaction.reply({ content: `Giveaway started in ${channel}!`, ephemeral: true });
  }
};
