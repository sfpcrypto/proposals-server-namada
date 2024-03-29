import config from "@root/config";
import { exec } from "child_process";

export const getProposalInfo = (): Promise<{ epoch: string; lastProposalId: string } | null> => {
  return new Promise((resolve) => {
    try {
      exec(`namadac query-proposal --node ${config.rpc}`, (error, lines) => {
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

        const epoch = items[0].split(" ")[3] || null;
        const lastProposalId = isNaN(+items[1].split(" ")[1]) ? null : (+items[1].split(" ")[1] - 1).toString();

        if (epoch && lastProposalId) {
          resolve({ epoch, lastProposalId });
          return;
        }

        resolve(null);
      });
    } catch {
      return null;
    }
  });
};
