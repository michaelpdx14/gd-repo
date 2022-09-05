# Transformer function Test 

## How to run it

First run `npm i` to install all the necessary modules

Second run `node index`, here is all the logic of our program

The program receives two arguments as input, the first a path or a url where the file is in csv format, the second is a function in the form of a chain that is executed to obtain the output.

So for example this would be an example of how our program runs `node index ./test.csv 'function square(number) {console.log(Math.pow(number, 2));}'`

## Some libs used 

fs: to load our file 
csv-parse: to transfor the csv to array 
_eval: to run the string function 
URL: to check if the first argument is a path o a url 
request and https: to get our file from a url 

## Pros and cons 

Cons: 
1. The function must go as a string so that it can be executed, otherwise it cannot be
2. It is not explained if the project must have express to run it from a tool like postman or if it should be run from the console

Pros 
It is a simple program with many applications