const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Open a support ticket')
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for your ticket')
        .setRequired(true)),
  async execute(interaction, client) {
    const reason = interaction.options.getString('reason');
    const guild = interaction.guild;
    const categoryName = 'Tickets';
    let category = guild.channels.cache.find(c => c.name === categoryName && c.type === 4);
    if (!category) {
      category = await guild.channels.create({ name: categoryName, type: 4 });
    }
    const ticketChannel = await guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: 0,
      parent: category.id,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        { id: client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
      ]
    });
    await ticketChannel.send({
      embeds: [{
        title: '🎫 New Ticket',
        description: `User: <@${interaction.user.id}>\nReason: ${reason}`,
        color: 0x5865F2,
        author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
        thumbnail: { url: interaction.user.displayAvatarURL() },
        footer: { text: `Subside Bot • Ticket • ${new Date().toLocaleDateString()}` },
        timestamp: new Date().toISOString()
      }]
    });
    await interaction.reply({ content: `Your ticket has been created: ${ticketChannel}`, ephemeral: true });
  }
};
