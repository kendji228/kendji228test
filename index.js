const Discord = require ('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.login(proccess.env.BOT_TOKEN);
client.on('guildMemberAdd' , member => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(`𝐋𝐢𝐛𝐞𝐫𝐭𝐲 𝐋𝐢𝐟𝐞  | 𝗚𝗧𝗔 𝟱 𝗥𝗣 𝗣𝗦𝟯 !`)

        .setDescription(`\n**Salut ${member} bienvenue sur ${member.guild.name} !**
       \n*Bon jeu à toi !*\n
        __N'oublie pas de lire le règlement ${member}.__ \n`)
        .setImage('https://cdn.discordapp.com/attachments/706648265944334469/706842557853728788/gta.gif')
    member.guild.channels.cache.get('706648953394823228').send(embed)
    console.log('+1')
});

client.on('guildMemberRemove' , member => {
    member.guild.channels.cache.get('706971401940238380').send(`:cry: *__Au revoir__* ${member} :cry: Nous sommes ${member.guild.memberCount}`);
    console.log('-1')
});

client.commands = new Discord.Collection();

fs.readdir(`./Commandes/`, (error, f) => {
    if(error) console.log(error);if(error) console.log(error);

    let commandes = f.filter(f => f.split('.').pop() === 'js');
    if(commandes.length <= 0) return console.log('Aucune commande trouvée !');

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);
        
        client.commands.set(commande.help.name, commande);
    });
})

fs.readdir(`./Events`, (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement !`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split('.')[0];

    client.on(event, events.bind(null, client));
    });
});
