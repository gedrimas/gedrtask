# gedrtask

HOW IT WORKS
There are only to classes:
1. AggrDataForCommEval - prepares data for commission evaluation: gets configs data via API and comertical operations data from the input file, validates all that data an merges them into one entity.
2. CommissionCounter - takes prepared data by AggrDataForCommEval, counts and displays commissions. 

HOW TO USE
1. git clone https://github.com/gedrimas/gedrtask.git (get code)
2. cd gedrtask (go to the root of the project)
3. npm i (install dependencies)
4. node app.js input.json (run the program)
5. npm run test
