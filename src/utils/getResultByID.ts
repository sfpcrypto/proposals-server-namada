import config from "@root/config";
import { exec } from "child_process";

export const getResultByID = (id: string): Promise<Record<string, string> | null> => {
  return new Promise((resolve) => {
    try {
      exec(`namadac query-proposal-result --proposal-id ${id} --node ${config.rpc}`, (error, lines) => {
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

        const result = {};

        if (items.length > 2) {
          result["result"] = items[1].trim();
          const data = items[2].split(",");
          result["yay"] = data[0].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
          result["nay"] = data[1].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
          result["abstain"] = data[1].match(/(-?\d*\.\d+)|(\d+)/g)?.[1];
          result["totalVotingPower"] = data[2].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
          result["threshold"] = data[3].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
        } else {
          result["result"] = items[1].trim().split(" ")[0];
          const data = items[1].split(",");
          result["yay"] = data[0].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
          result["nay"] = data[1].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
          result["abstain"] = data[1].match(/(-?\d*\.\d+)|(\d+)/g)?.[1];
          result["totalVotingPower"] = data[2].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
          result["threshold"] = data[3].match(/(-?\d*\.\d+)|(\d+)/g)?.[0];
        }

        if (Object.keys(result).length) {
          resolve(result as Record<string, string>);
          return;
        }

        resolve(null);
      });
    } catch {
      return null;
    }
  });
};
