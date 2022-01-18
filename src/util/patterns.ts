import chalk from 'chalk';
export default function patterns(bot:any) {
    //REGEX
    //----------------------------------------------------------------
    bot.addChatPattern("whisperFrom", /^([^ ]*) whispers to you: (.*)$/, {
      parse: true,
    }); //ForestBot whispers to you: message
    //----------------------------------------------------------------
    /**
     *  [me -> Username] Message
     */
    bot.addChatPattern("whisperTo", /^\[me -> ([^ ]*)\] (.*)$/, {
      parse: true,
    });
    /**
     *  [Username -> me] Message
     */
    bot.addChatPattern("whisperFrom", /^\[([^ ]*) -> me\] (.*)$/, {
      parse: true,
    });
    //----------------------------------------------------------------
    /**
     * You whisper to Username: Message
     */
    bot.addChatPattern("whisperTo", /^You whisper to ([^ ]*): (.*)$/, {
      parse: true,
    });
    /**
     * Username whispers: Message
     */
    bot.addChatPattern("whisperFrom", /^([^ ]*) whispers: (.*)$/, {
      parse: true,
    });
    //----------------------------------------------------------------
    /**
     *  [You -> Username] Message
     */
    bot.addChatPattern("whisperTo", /^\[You -> ([^ ]*)\] (.*)$/, {
      parse: true,
    });
    /**
     * [Username -> You] Message
     */
    bot.addChatPattern("whisperFrom", /^\[([^ ]*) -> You\] (.*)$/, {
      parse: true,
    });
    //----------------------------------------------------------------  
    /**
     * <Username> Message
     */
    bot.addChatPattern("chat", /^<([^ ]*)> (.*)$/, {
      parse: true,
    });
    /**
     * Username: Message
     */
    bot.addChatPattern("chat", /^([^ ]*): (.*)$/, {
      parse: true,
    });
    /**
     * Username » Message
     */
    bot.addChatPattern("chat", /^([^ ]*) » (.*)$/, {
      parse: true,
    });
    /**
     * Username > Message
     */
    bot.addChatPattern("chat", /^([^ ]*) > (.*)$/, {
      parse: true,
    });
    /**
     * [Jr MOD] Username ✪ > Message
     */
    bot.addChatPattern("chat", /^\[Jr MOD\] ([^ ]*) ✪ > (.*)$/, {
      parse: true,
    });
    /**
     * [Mod] Username » Message
     */
    bot.addChatPattern("chat", /^\[Mod\] ([^ ]*) » (.*)$/, {
      parse: true,
    });
    /**
     * [Mod] Username ✪ > Message
     */
    bot.addChatPattern("chat", /^\[Mod\] ([^ ]*) ✪ > (.*)$/, {
      parse: true,
    });
    /**
     * [Discord] Username > Message
     */
    bot.addChatPattern("chat", /^\[Discord\] ([^ ]*) > (.*)$/, {
      parse: true,
    });
    /**
     * [Discord] Username » Message
     */
    bot.addChatPattern("chat", /^\[Discord\] ([^ ]*) » (.*)$/, {
      parse: true,
    });
    /**
     * [Discord] [Mod] Username > Message
     */
    bot.addChatPattern("chat", /^\[Discord\] \[Mod\] ([^ ]*) > (.*)$/, {
      parse: true,
    });
    /**
     * [Discord] [Donator] Username > Message
     */
    bot.addChatPattern("chat", /^\[Discord\] \[Donator\] ([^ ]*) > (.*)$/, {
      parse: true,
    });

    bot.addChatPattern("chat", /^\[Discord\] \[Nito Booster\] ([^ ]*) > (.*)$/, {
        parse: true,
      });
    //----------------------------------------------------------------
    bot.addChatPattern(
      "pvp",
      /^([^ ]*) (?:was slain by|was burnt to a crisp while fighting|was killed by magic whilst trying to escape|drowned whilst trying to escape|experienced kinetic energy whilst trying to escape|was shot by|was blown up by|hit the ground too hard whilst trying to escape|was killed trying to hurt) ([^ ]*)/,
      { parse: true }
    );
    bot.addChatPattern(
      "pvpMessages",
      /^([^ ]*) (?:was slain by|was burnt to a crisp while fighting|was killed by magic whilst trying to escape|drowned whilst trying to escape|experienced kinetic energy whilst trying to escape|was shot by|was blown up by|hit the ground too hard whilst trying to escape|was killed trying to hurt) ([^ ]*)/,
      { parse: false }
    );
    bot.addChatPattern(
      "pve",
      /^([^ ]*) (?:died|tried to swim in lava|was pricked to death|Was killed by nature|drowned|blew up|was killed by|hit the ground too hard|experienced kinetic energy|fell from a high place|fell off a ladder|fell while climbing|went up in flames|burned to death|was struck by lightning|was killed by magic|starved to death|was stung to death|suffocated in a wall|withered away|froze to death|went off with a bang)$/,
      { parse: true }
    );
    bot.addChatPattern(
      "pveMessages",
      /^([^ ]*) (?:died|tried to swim in lava|was pricked to death|Was killed by nature|drowned|blew up|was killed by|hit the ground too hard|experienced kinetic energy|fell from a high place|fell off a ladder|fell while climbing|went up in flames|burned to death|was struck by lightning|was killed by magic|starved to death|was stung to death|suffocated in a wall|withered away|froze to death|went off with a bang)$/,
      { parse: false }
    );
    //----------------------------------------------------------------

    return console.log(chalk.green("Patterns loaded."));
  };