import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import Redis from 'ioredis';

const app = new Hono();
const client = new Redis(process.env.REDIS_URI as string);

app.use("*", cors());
app.use("*", logger());

app.get("/", async (ctx: Context) => {
    return ctx.text("Wordle API");
});

app.patch("/gen", async (ctx: Context) => {
    const { key } = ctx.req.query();
    if(key !== process.env.SECRET_KEY) {
        return ctx.json({
            message: 'Invalid key',
        }, 401);
    }
    let wordForToday = await client.randomkey();
    if(wordForToday == 'today') {
        wordForToday = await client.randomkey();
    }
    await client.set('today', wordForToday as string);
    // await client.del(wordForToday as string);
    return ctx.json({ 
        today: wordForToday,
    });
})

app.post("/check", async (ctx: Context) => {
    const { word } = await ctx.req.json();
    if(!word) {
        return ctx.json({
            message: 'Missing word',
        }, 400);
    }

    const input = word.split('')
    const today = await client.get('today') as string;
    const todayWord = today.split('');
    let response: any = [];

    for (let i = 0; i < input.length; i++) {
        const letter = input[i];
        let isCorrect = false;
        if(todayWord[i] === input[i]) {
            isCorrect = true;
        }
        let isLetterInWord = false;
        for (const l of todayWord) {
            if(l === letter) {
                isLetterInWord = true;
                break;
            }
        }
        response.push({
            letter,
            isCorrectPos: isCorrect,
            isLetterInWord,
        });
    }

    return ctx.json(response);
});

export default {
    port: 3000,
    fetch: app.fetch,
} as any;