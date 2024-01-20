import * as fs from "fs";
import * as path from "path";

export async function searchComponents(directory: string): Promise<string[]> {
  let components: string[] = [];
  const files = await fs.promises.readdir(directory);

  for (let filename of files) {
    const fullPath = path.join(directory, filename);
    const stat = await fs.promises.stat(fullPath);

    if (stat.isDirectory()) {
      components = components.concat(await searchComponents(fullPath));
    } else if (filename.endsWith(".jsx") || filename.endsWith(".tsx")) {
      const content = await fs.promises.readFile(fullPath, "utf-8");
      const matches = content.match(
        /export default function (\S+)|class (\S+) extends React.Component/g
      );
      if (matches) {
        matches.forEach((match) => {
          const componentName = match.split(" ")[2];
          components.push(componentName);
        });
      }
    }
  }

  return components;
}
