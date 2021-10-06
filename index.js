// Require the necessary discord.js classes
const { Client, Intents, GuildMember } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES
]});

const guildMember = new GuildMember();

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	let channelName = '';
	let memberName = '';
	switch (commandName) {
		case 'disconnectchannel':
			channelName = interaction.options.getString('channel').toLowerCase();
			memberName = interaction.options.getString('member');

			//const channelExist = interaction.guild.channels.cache.filter(e => e.name.toLowerCase() === channelName.toLowerCase());
			// const memberExist = interaction.guild.members.cache.filter(e => e.displayName.toLowerCase() === memberName.toLowerCase());

			/*if (channelExist.size === 0) {
				await interaction.reply('Channel does not exist');
				break;
			}*/

			if (!channelExist(interaction, channelName)) {
				await interaction.reply('Channel does not exist');
				break;
			}

			if (!memberExist(interaction, memberName)) {
				await interaction.reply('Member does not exist');
				break;
			}

			interaction.guild.members.fetch().then(fetchedMembers => {
				let members = fetchedMembers;
				if (memberName) {
					members = members.filter(member => {
						return member.displayName.toLowerCase() === memberName.toLowerCase()
					})
				}

				members.each(member => {
					if (member.voice.channel) {
						if (member.voice.channel.name.toLowerCase() === channelName.toLowerCase()) {
							member.voice.disconnect();
						}
					}
				})
			});
			await interaction.reply('Chanel\'s member disconnect');
			break;
		case 'disconnectchannelbytime':
			let seconds = 0;
			channelName = interaction.options.getString('channel').toLowerCase();
			const timeString = interaction.options.getString('time').trim();
			memberName = interaction.options.getString('member');

			if (timeString.includes(':')) {
				seconds = parseInt(timeString.split(':')[0]) * 60 + parseInt(timeString.split(':')[1]);
			} else if (timeString.includes('分') && timeString.includes('秒')) {
				if (timeString.indexOf('分') > timeString.indexOf('秒')) {
					await interaction.reply('Time\'s format is wrong');
					break;
				} else {
					const mins = parseInt(timeString.split('分')[0]);
					const secs = parseInt(timeString.split('分')[1].split('秒')[0]);
					seconds = mins * 60 + secs;
				}
			} else {
				await interaction.reply('Time\'s format is wrong');
				break;
			}

			if (!channelExist(interaction, channelName)) {
				await interaction.reply('Channel does not exist');
				break;
			}

			if (!memberExist(interaction, memberName)) {
				await interaction.reply('Member does not exist');
				break;
			}

			interaction.guild.members.fetch().then(fetchedMembers => {
				let members = fetchedMembers;
				if (memberName) {
					members = members.filter(member => {
						return member.displayName.toLowerCase() === memberName.toLowerCase()
					})
				}

				members.each(member => {
					if (member.voice.channel) {
						if (member.voice.channel.name.toLowerCase() === channelName.toLowerCase()) {
							setTimeout(e => {
								member.voice.disconnect();
							}, seconds * 1000)
						}
					}
				})
			});
			await interaction.reply(`${timeString} later disconnect`);

			break;
	}
});

function channelExist(interaction, channelName) {
	const channels = interaction.guild.channels.cache.filter(e => e.name.toLowerCase() === channelName.toLowerCase());
	if (channels.size === 0) {
		return false;
	}
	return true;
}

function memberExist(interaction, memberName) {
	if (!memberName) {
		return true;
	}
	const members = interaction.guild.members.cache.filter(e => e.displayName.toLowerCase() === memberName.toLowerCase());
	if (members.size === 0) {
		return false;
	}
	return true;
}

// Login to Discord with your client's token
client.login(token);