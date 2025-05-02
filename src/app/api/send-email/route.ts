import nodemailer, { SendMailOptions } from "nodemailer";
import { promises } from "fs";
import { compile } from "handlebars";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@src/config/env";
import path from "path";

export type EmailerOptions = {
  mailerName: string;
  to: string;
  subject: string;
  htmlFileName: string;
  replacements?: Record<string, string | null | undefined>;
  attachments?: Array<{
    filename: string;
    content?: string;
    encoding?: string;
    path?: string;
    cid?: string;
  }>;
};

export async function POST(req: NextRequest) {
  const body: EmailerOptions = await req.json();

  try {
    const { mailerName, to, subject, htmlFileName, replacements, attachments } =
      body;

    const transporter = nodemailer.createTransport({
      host: env.emailer.host,
      port: 465,
      secure: true,
      auth: {
        user: env.emailer.user,
        pass: env.emailer.pass,
      },
    });

    const htmlData = await promises.readFile(
      path.resolve(`src/templates/${htmlFileName}`),
      {
        encoding: "utf-8",
      }
    );
    const htmlTemplate = compile(htmlData);
    const htmlToSend = htmlTemplate(replacements);

    const mailOptions: SendMailOptions = {
      from: `"${mailerName}" ${env.emailer.user}`,
      to,
      subject,
      html: htmlToSend || "",
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully to ".concat(to),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
