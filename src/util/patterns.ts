import chalk from 'chalk';
export default function patterns(bot: any) {

  const options = { parse: true };

  bot.addChatPattern("whisperFrom", /^([^ ]*) whispers to you: (.*)$/, options); //ForestBot whispers to you: message
  /**
   *  [me -> Username] Message
   */
  bot.addChatPattern("whisperTo", /^\[me -> ([^ ]*)\] (.*)$/, options);
  /**
   *  [Username -> me] Message
   */
  bot.addChatPattern("whisperFrom", /^\[([^ ]*) -> me\] (.*)$/, options);
  /**
   * You whisper to Username: Message
   */
  bot.addChatPattern("whisperTo", /^You whisper to ([^ ]*): (.*)$/, options);
  /**
   * Username whispers: Message
   */
  bot.addChatPattern("whisperFrom", /^([^ ]*) whispers: (.*)$/, options);
  /**
   *  [You -> Username] Message
   */
  bot.addChatPattern("whisperTo", /^\[You -> ([^ ]*)\] (.*)$/, options);
  /**
   * [Username -> You] Message
   */
  bot.addChatPattern("whisperFrom", /^\[([^ ]*) -> You\] (.*)$/, options);
  /**
   * <Username> Message
   */
  bot.addChatPattern("chat", /^<([^ ]*)> (.*)$/, options);
  /**
   * Username: Message
   */
  bot.addChatPattern("chat", /^([^ ]*): (.*)$/, options);
  /**
   * Username » Message
   */
  bot.addChatPattern("chat", /^([^ ]*) » (.*)$/, options);
  /**
   * Username > Message
   */
  bot.addChatPattern("chat", /^([^ ]*) > (.*)$/, options);
  /**
   * [Jr MOD] Username ✪ > Message
   */
  bot.addChatPattern("chat", /^\[Jr MOD\] ([^ ]*) ✪ > (.*)$/, options);
  /**
   * [Mod] Username » Message
   */
  bot.addChatPattern("chat", /^\[Mod\] ([^ ]*) » (.*)$/, options);
  /**
   * [Mod] Username ✪ > Message
   */
  bot.addChatPattern("chat", /^\[Mod\] ([^ ]*) ✪ > (.*)$/, options);
  /**
   * [Discord] Username > Message
   */
  bot.addChatPattern("chat", /^\[Discord\] ([^ ]*) > (.*)$/, options);
  /**
   * [Discord] Username » Message
   */
  bot.addChatPattern("chat", /^\[Discord\] ([^ ]*) » (.*)$/, options);
  /**
   * [Discord] [Mod] Username > Message
   */
  bot.addChatPattern("chat", /^\[Discord\] \[Mod\] ([^ ]*) > (.*)$/, options);
  /**
   * [Discord] [Donator] Username > Message
   */
  bot.addChatPattern("chat", /^\[Discord\] \[Donator\] ([^ ]*) > (.*)$/, options);

  bot.addChatPattern("chat", /^\[Discord\] \[Nitro Booster\] ([^ ]*) > (.*)$/, options);
  //----------------------------------------------------------------

  bot.addChatPattern(
    "pvpMessages",
    /^([^ ]*) (?:was slain by|was burnt to a crisp while fighting|was killed by magic whilst trying to escape|drowned whilst trying to escape|experienced kinetic energy whilst trying to escape|was shot by|was blown up by|hit the ground too hard whilst trying to escape|was killed trying to hurt|tried to swim in lava to escape) ([^ ]*)/,
    { parse: false }
  );

  bot.addChatPattern(
    "pveMessages",
    /^([^ ]*) (?:died|tried to swim in lava|was pricked to death|Was killed by nature|drowned|blew up|was killed by|hit the ground too hard|experienced kinetic energy|fell from a high place|fell off a ladder|fell while climbing|went up in flames|burned to death|was struck by lightning|was killed by magic|starved to death|was stung to death|suffocated in a wall|withered away|froze to death|went off with a bang)$/,
    { parse: false }
  );
  //----------------------------------------------------------------

  return console.log(chalk.green("Patterns loaded."));
};