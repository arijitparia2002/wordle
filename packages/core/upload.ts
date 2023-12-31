import fs from 'fs';
import Redis from "ioredis"

const client = new Redis(process.env.REDIS_URI as string);

const getFilesForUpload = () => {
    const files = fs.readdirSync('scripts/output');
    return files;
}

const extractWords = async () => {
    console.log('Uploading words to redis collection ...');
    const files = getFilesForUpload();
    const wordList: string[] = [];
    for (const file of files) {
        if(file === '.gitkeep') continue;
        const fileData = fs.readFileSync(`scripts/output/${file}`, 'utf-8');
        const words = fileData.split('\n');
        wordList.push(...words);
    }
    for (const word of wordList) {
        await client.set(word, 0);
    }
    console.log('Done');
    process.exit(0);
}

await extractWords();