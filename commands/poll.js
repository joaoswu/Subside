const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a simple yes/no poll')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Poll question')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const pollEmbed = {
      title: '📊 Poll',
      description: `**${question}**\n\n✅ = Yes\n❌ = No`,
      color: 0x5865F2,
      footer: { text: 'Vote below!' }
    };
    const pollMsg = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
    await pollMsg.react('✅');
    await pollMsg.react('❌');
  }
};
