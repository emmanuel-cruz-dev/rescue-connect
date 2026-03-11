import fs from "fs";
import path from "path";
import mjml2html from "mjml";

export function renderTemplate(
  templateName: string,
  variables: Record<string, string>
) {
  const layoutPath = path.join(__dirname, "../templates/layout.mjml");
  const templatePath = path.join(
    __dirname,
    `../templates/${templateName}.mjml`
  );

  let layout = fs.readFileSync(layoutPath, "utf8");
  let content = fs.readFileSync(templatePath, "utf8");

  for (const key in variables) {
    const value = variables[key];

    layout = layout.replace(new RegExp(`{{${key}}}`, "g"), value);
    content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  layout = layout.replace("{{content}}", content);

  const { html } = mjml2html(layout);

  return html;
}
