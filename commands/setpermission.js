const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setpermission')
    .setDescription('Set required role for a command')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('Command name')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Role required to use the command')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client, { settings, saveSettings }) {
    const command = interaction.options.getString('command');
    const role = interaction.options.getRole('role');
    if (!settings.guilds[interaction.guild.id]) settings.guilds[interaction.guild.id] = {};
    if (!settings.guilds[interaction.guild.id].permissions) settings.guilds[interaction.guild.id].permissions = {};
    settings.guilds[interaction.guild.id].permissions[command] = role.id;
    saveSettings();
    await interaction.reply({
      embeds: [{
        title: '🔒 Command Permission Set',
          description: `Command \`${command}\` now requires the role <@&${role.id}>.`,
        color: 0x57F287
      }],
      ephemeral: true
    });
  }
};
