import config from "@root/config";
import { exec } from "child_process";

export const getVotesByID = (id: string): Promise<Record<string, string>[] | null> => {
  return new Promise((resolve) => {
    try {
      exec(`namadac query-proposal-votes --proposal-id ${id} --node ${config.rpc}`, (error, lines) => {
        if (error) {
          console.log(error);
          resolve(null);
          return;
        }
        const items = lines
          .toString()
          .split("\n")
          .filter((line) => line.trim());

        if (items[0].includes("The application panicked (crashed).")) {
          console.log("The application panicked (crashed).");
          resolve(null);
          return;
        }
        const result: Record<string, string>[] = [];

        const data = items.slice(1);
        for (let i = 0; i < data.length; i += 2) {
          result.push({
            [data[i].split(":")[0].trim().toLocaleLowerCase()]: data[i].split(":")[1].trim(),
            [data[i + 1].split(":")[0].trim().toLocaleLowerCase()]: data[i + 1].split(":")[1].trim(),
          });
        }

        resolve(result);
      });
    } catch {
      return null;
    }
  });
};
