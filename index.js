// Require the necessary discord.js classes
const { Client, Intents, GuildMember, MessageActionRow, MessageSelectMenu } = require('discord.js');
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
	let memberSelectMenu = [];
	let row = new MessageActionRow();
	switch (commandName) {
		case 'disconnectchannel':
			channelName = interaction.options.getString('channel').toLowerCase();
			memberName = interaction.options.getString('member');

			if (!channelExist(interaction, channelName)) {
				await interaction.reply('このチャンネルはありません。');
				break;
			}

			if (!memberExist(interaction, memberName)) {
				await interaction.reply('このメンバーはいません。');
				break;
			}

			interaction.guild.members.fetch().then(async fetchedMembers => {
				let members = fetchedMembers;
				if (memberName) {
					members = members.filter(member => {
						return member.displayName.toLowerCase() === memberName.toLowerCase();
					})
				}

				if (members.size > 1) {
					members.each(member => {
						if (member.voice.channel) {
							if (member.voice.channel.name.toLowerCase() === channelName.toLowerCase()) {
								memberSelectMenu.push({
									label: member.displayName,
									description: member.user.username,
									value: member.user.id,
								})
							}
						}
					})
					row = row.addComponents(
						new MessageSelectMenu()
							.setCustomId('disconnectchannel')
							.setPlaceholder('選択してください')
							.addOptions(memberSelectMenu)
					);

					await interaction.reply({
						content: 'メンバーを選択してください ',
						components: [row]
					});
				} else {
					members.each(member => {
						if (member.voice.channel) {
							if (member.voice.channel.name.toLowerCase() === channelName.toLowerCase()) {
								member.voice.disconnect();
							}
						}
					})

					await interaction.reply('チャンネルのメンバーは切断する');
				}
			});
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
					await interaction.reply('間違った時間形式');
					break;
				} else {
					const mins = parseInt(timeString.split('分')[0]);
					const secs = parseInt(timeString.split('分')[1].split('秒')[0]);
					seconds = mins * 60 + secs;
				}
			} else {
				await interaction.reply('間違った時間形式');
				break;
			}

			if (!channelExist(interaction, channelName)) {
				await interaction.reply('このチャンネルはありません。');
				break;
			}

			if (!memberExist(interaction, memberName)) {
				await interaction.reply('このメンバーはいません。');
				break;
			}

			interaction.guild.members.fetch().then(async fetchedMembers => {
				let members = fetchedMembers;
				if (memberName) {
					members = members.filter(member => {
						return member.displayName.toLowerCase() === memberName.toLowerCase();
					})
				}

				if (members.size > 1) {
					members.each(member => {
						if (member.voice.channel) {
							if (member.voice.channel.name.toLowerCase() === channelName.toLowerCase()) {
								memberSelectMenu.push({
									label: member.displayName,
									description: member.user.username,
									value: `${member.user.id},${seconds}`,
								})
							}
						}
					})
					row = row.addComponents(
						new MessageSelectMenu()
							.setCustomId('disconnectchannelbytime')
							.setPlaceholder('選択してください')
							.addOptions(memberSelectMenu)
					);

					await interaction.reply({
						content: 'メンバーを選択してください ',
						components: [row]
					});
				} else {
					members.each(member => {
						if (member.voice.channel) {
							if (member.voice.channel.name.toLowerCase() === channelName.toLowerCase()) {
								setTimeout(e => {
									member.voice.disconnect();
								}, seconds * 1000)
							}
						}
					})

					await interaction.reply(`${timeString}あとに切断する`);
				}
			});
			break;
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	
	if (interaction.customId === 'disconnectchannel') {
		interaction.guild.members.fetch().then(fetchedMembers => {
			fetchedMembers.each(member => {
				if (member.id === interaction.values[0]) {
					member.voice.disconnect();
				}
			})
		})
		await interaction.reply('切断する');
	} else if (interaction.customId === 'disconnectchannelbytime') {
		const id = interaction.values[0].split(',')[0];
		const seconds = interaction.values[0].split(',')[1];
		interaction.guild.members.fetch().then(fetchedMembers => {
			fetchedMembers.each(member => {
				if (member.id === id) {
					setTimeout(e => {
						member.voice.disconnect();
					}, seconds * 1000)
				}
			})
		})
		await interaction.reply(`${Math.floor(parseInt(seconds)/60)}分${parseInt(seconds)%60}秒あとに切断する`);
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