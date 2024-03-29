import config from "@root/config";
import { toCamelCase } from "@root/helpers/toCamelCase";
import { exec } from "child_process";

type Proposal = {
  lastCommittedEpoch: number;
  proposalId: number;
  type: string;
  author: string;
  content: Record<string, unknown>;
  startEpoch: number;
  endEpoch: number;
  graceEpoch: number;
  status: string;
  data: Record<string, string[]> | null;
};
export const getProposalByID = (id: string): Promise<Proposal | null> => {
  return new Promise((resolve) => {
    try {
      exec(`namadac query-proposal --proposal-id ${id} --node ${config.rpc}`, (error, lines) => {
        if (error) {
          console.log(error);
          resolve(null);
          return;
        }

        const result = {};

        const items = lines
          .toString()
          .split("\n")
          .filter((line) => line.trim());

        if (items[0].includes("The application panicked (crashed).")) {
          console.log("The application panicked (crashed).");
          resolve(null);
          return;
        }

        if (items.length < 11) {
          items.forEach((item) => {
            const temp = item.split(":");
            if (temp[0] === "Content") {
              result["content"] = JSON.parse(temp.slice(1).join(":"));
            } else if (temp[0] === "Data") {
              result["data"] = null;
            } else {
              result[toCamelCase(temp[0])] = isNaN(+temp[1]) ? temp[1].trim() : +temp[1];
            }
          });
        } else {
          items.forEach((item, index) => {
            const temp = item.split(":");
            if (index < 9) {
              if (temp[0] === "Content") {
                result["content"] = JSON.parse(temp.slice(1).join(":"));
              } else {
                result[toCamelCase(temp[0])] = isNaN(+temp[1]) ? temp[1].trim() : +temp[1];
              }
            }
          });
          const dataArr = items.slice(10);
          result["data"] = { Addresses: dataArr.map((data) => data.trim()) };
        }

        if (Object.keys(result).length) {
          resolve(result as Proposal);
          return;
        }

        resolve(null);
      });
    } catch {
      return null;
    }
  });
};
