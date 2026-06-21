import { Request, Response } from "express";
import prisma from "../config/prisma";
import { Parser } from "json2csv";

export const exportReportsCSV = async (
req: Request,
res: Response
) => {
try {
const reports =
await prisma.report.findMany();

const parser =
  new Parser();

const csv =
  parser.parse(reports);

res.header(
  "Content-Type",
  "text/csv"
);

res.attachment(
  "reports.csv"
);

return res.send(csv);


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Export Failed",
});


}
};
