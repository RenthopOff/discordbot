const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let replies = ["http://images.vfl.ru/ii/1541862727/3540fecf/24139903.jpg", "http://images.vfl.ru/ii/1541862804/962938a3/24139923.jpg", "http://images.vfl.ru/ii/1541862873/a0b58aa7/24139953.jpg", "http://images.vfl.ru/ii/1541862903/e9ada845/24139968.jpg"];

    let result = Math.floor((Math.random() * replies.length));

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Надо иметь права : **ADMINISTRATOR**");
    if(args[0] == "help"){
      message.reply("Usage: !ban <пользователь> <причина>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let day = message.guild.createdAt.getDate();
    let month = 1 + message.guild.createdAt.getMonth();
    let year = message.guild.createdAt.getFullYear();
    if(!bUser) return message.channel.send("Не могу найти его!");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("У него привилегия выше твоей!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setFooter(`Время бана • ${day}.${month}.${year}`)
    .setColor("#8000ff")
    .addField("Забанен", `${bUser} с ID ${bUser.id}`)
    .addField("Кем был выдан бан", `<@${message.author.id}>`)
    .addField("Забанен в", message.channel)
    .addField("Причина", bReason)
    .setImage(replies[result]);

    let incidentchannel = message.guild.channels.find(`name`, "📥ссылки");
    if(!incidentchannel) return message.channel.send("Не могу найти канал где это произошло.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
