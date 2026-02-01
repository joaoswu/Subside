const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setprefix')
    .setDescription('Set a custom prefix for this server')
    .addStringOption(option =>
      option.setName('prefix')
        .setDescription('The new prefix (1-5 characters)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction, client, { settings, saveSettings }) {
    const prefix = interaction.options.getString('prefix');
    
    // Validate prefix length
    if (prefix.length < 1 || prefix.length > 5) {
      return interaction.reply({ 
        content: 'Prefix must be 1-5 characters.', 
        ephemeral: true 
      });
    }
    
    // Initialize guild settings if they don't exist
    if (!settings.guilds[interaction.guild.id]) {
      settings.guilds[interaction.guild.id] = {};
    }
    
    // Set the new prefix
    settings.guilds[interaction.guild.id].prefix = prefix;
    saveSettings();
    
    // Create embed using EmbedBuilder
    const embed = new EmbedBuilder()
      .setTitle('🔧 Prefix Set')
      .setDescription(`The command prefix for this server is now \`${prefix}\``)
      .setColor(0x57F287);
    
    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};