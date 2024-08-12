import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/atac", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //! For demo purposes only - to check error handling on client side
  //return res.status(401).json();

  const fileContent = await fs.readFile("./data/atac.json");

  const atacData = JSON.parse(fileContent);
  const { getClosed } = req.query;

  console.log(getClosed);

  const atacSummaryData = atacData
    .map((atac) => {
      return {
        date_opened: atac.date_opened,
        device: atac.device,
        id: atac.id,
        status: atac.status,
        detail: atac.detail,
        problem_statement: atac.problem_statement,
      };
    })
    .filter((atac) => {
      return getClosed ? atac.status === "closed" : atac.status === "open";
    });

  res.status(200).json({ atac: atacSummaryData });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
