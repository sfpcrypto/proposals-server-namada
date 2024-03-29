import "./aliases";

import express from "express";
import cors from "cors";

import config from "./config";
import { getProposalInfo } from "./utils/getProposalInfo";

import { getProposalByID } from "./utils/getProposalByID";
import { getVotesByID } from "./utils/getVotesByID";
import { getResultByID } from "./utils/getResultByID";

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const info = await getProposalInfo();

    res.status(200).send(info);
  } catch (error) {
    res.status(500).send({ error: "error request proposal info" });
  }
});

app.get("/proposal/:proposalId", async (req, res) => {
  try {
    if (!req.params.proposalId) {
      throw new Error("missing proposal id");
    }
    const proposal = await getProposalByID(req.params.proposalId);
    const votes = await getVotesByID(req.params.proposalId);
    const result = await getResultByID(req.params.proposalId);
    const data = !!proposal ? { ...proposal, votes, result } : null;
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

app.listen(+config.port, () => {
  console.log(`Express server listening on port ${config.port} / process ID - ${process.pid}`);
});
