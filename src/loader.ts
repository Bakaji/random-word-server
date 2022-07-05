import path from "path";
import fs from "fs";
let words: string[] = [];
const loadWords = (): string[] => {
  const filePath = path.join(__dirname, "../words.txt");
  try {
    const data: string = fs.readFileSync(filePath, { encoding: "utf-8" });
    words = data.split("\n");
    return words;
  } catch (e) {
    console.log("Error:", e);
    process.exit(1);
  }
};

export { words, loadWords };
