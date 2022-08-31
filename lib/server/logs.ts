const logger = () => {
  const logs: Record<string, (() => void)[]> = {};
  console.info(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⣤⣤⣤⣤⣄⣀⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣠⡤⣤⣄⣤⡴⠶⠟⠛⠉⠉⠁⠀⠀⠀⠀⠉⠉⠛⠷⣦⡀⠀⠀
⠀⠀⠀⠀⠀⣾⣿⡷⣿⣟⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡀⠀
⠀⠀⠀⢀⣴⠟⠿⣦⣴⠿⠛⢶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀
⠀⠀⣠⡞⠁⠀⠀⠀⠀⠀⠀⠀⠈⠛⢷⣤⡀⠀⠀⢀⣀⣀⣠⣤⣤⠶⠟⠋⠀⠀
⠀⢰⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣬⠿⠚⢛⠛⠋⠉⠉⠁⠀⠀⠀⠀⠀⠀
⠀⢿⡇⠀⠀⠀⠀⠀⠀⠀⣀⣤⠶⠛⠉⠀⠀⠀⠘⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⢷⣄⣀⣀⣀⣤⡶⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣷⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀⠀⠀⠀

`);

  return {
    info: (strings: string[], group?: string) => {
      const __invoke = () => {
        const [first, ...rest] = strings;
        console.info([`➰ :lasso:  ${first}`, ...rest].join("\n"));
      };
      if (!group) {
        __invoke();
      } else {
        if (!logs[group]) logs[group] = [];
        logs[group].push(__invoke);
      }
    },

    logs() {
      for (const group of Object.values(logs)) {
        group.forEach((log) => {
          log();
        });

        console.info(`\n`);
      }
    },
  };
};

export const log = logger();
