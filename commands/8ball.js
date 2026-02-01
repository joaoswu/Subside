const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8ball a question')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Your question for the 8ball')
        .setRequired(true)),
  async execute(interaction) {
    const responses = [
      'Yes.', 'No.', 'Maybe.', 'Ask again later.', 'Definitely!', "I don't think so."
    ];
    const reply = responses[Math.floor(Math.random() * responses.length)];
    await interaction.reply({
      embeds: [{
        title: '🎱 The Magic 8ball',
        description: `**Question:** ${interaction.options.getString('question')}
**Answer:** ${reply}`,
        color: 0x5865F2,
        footer: { text: 'Ask again anytime! 🔮' }
      }]
    });
  }
};
