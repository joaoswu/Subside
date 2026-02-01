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
**Answer:** ${reply}`,
      embeds: [{
        title: '🎱 The Magic 8ball',
        description: `**Question:** ${interaction.options.getString('question')}
**Answer:** ${reply}`,
        color: 0x5865F2,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/104/104980.png' },
        footer: { text: `Subside Bot • 8ball • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
