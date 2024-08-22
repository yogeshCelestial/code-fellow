#!/usr/bin/env node
import { Command } from "commander";
import fs from 'fs';
import path from "path";
import { analyzeCode } from "./ai-prompt/index.js";
import chalk from "chalk";
import _ from 'underscore';

const program = new Command();

program.name('code-fellow').description('A CLI tool to test code quality in terms of security, performace and other aspects using Google Generative AI').version('1.0.0');

program.command('check <file>').description('Analyze the Code').action(async(file) => {
    try {
        const codePath = path.resolve(process.cwd(), file);
        console.log('Checking File at path: ', codePath)

        if (!fs.existsSync(codePath)) {
            console.error('File not found');
            process.exit(1);
        }

        if (fs.statSync(codePath).isDirectory()) {
            console.error('Given directory is not a file');
            process.exit(1);
        }

        const code = fs.readFileSync(codePath, 'utf8');
        const qualityReport = await analyzeCode(code);
        const reportGroup = _.groupBy(qualityReport, 'section');
        const checkReport = reportGroup?.['Check Report']?.[0].details;
        const qualityScores = reportGroup?.['Quality Scores']?.[0].details
        const suggestions = reportGroup?.['Suggestions for Improvements']?.[0].details;
        if (checkReport && qualityScores && suggestions) {
            console.log(chalk.bgGrey('-----------------------Quality Report---------------------'), '\n');
            console.log(chalk.bgGrey('--CHECK REPORT--'), '\n');
            console.log(chalk.blueBright(checkReport), '\n');
            console.log(chalk.bgGrey('--SCORE POINTS--'), '\n');
            qualityScores.forEach((element : { metric : string, score: number}) => {
                if (element.score > 5) {
                    console.log(chalk.green(`${element.metric} : ${element.score}`));
                } else {
                    console.log(chalk.redBright(`${element.metric} : ${element.score}`));  
                }
            });
            console.log('\n');
            console.log(chalk.bgGrey('--IMPROVEMENTS SUGGESTION--'), '\n');
            console.log(chalk.yellowBright(suggestions), '\n');
            console.log('\n');
        } else {
            console.error('Some Error Occurred at Server Side');
            process.exit(1);
        }
    } catch (error: any) {
        console.log('Error occured', error?.message);
    }
});

program.parse(process.argv);