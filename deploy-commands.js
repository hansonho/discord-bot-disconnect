const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('disconnectchannel')
		.setDescription('Channel disconnect')
		.addStringOption(option => option.setName('channel').setDescription('enter channel name').setRequired(true))
		.addStringOption(option => option.setName('member').setDescription('enter member name if not then all member')),
	new SlashCommandBuilder().setName('disconnectchannelbytime')
		.setDescription('Channel disconnect by time')
		.addStringOption(option => option.setName('channel').setDescription('enter channel name').setRequired(true))
		.addStringOption(option => option.setName('time').setDescription('enter duration of connect').setRequired(true))
		.addStringOption(option => option.setName('member').setDescription('enter member if not then all member')),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);