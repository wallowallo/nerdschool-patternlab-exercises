# Building front-ends with PatternLab
[Slides from the presentation can be found here](https://docs.google.com/presentation/d/18R4Toq5VyJSwfvm7fsn9z95w4N_qO6XU8fDbTwMFOCI/edit?usp=sharing)

## Prerequisites
* Bring your own laptop
* Make sure Git is installed and available on command line. Install from [https://git-scm.com/downloads](https://git-scm.com/downloads)
* Node JS with npm must be installed and available on command line. Install from: [https://nodejs.org/](https://nodejs.org/). In this workshop we need a node version that is 5.0 or higher. To check your node version, type `node -v` in your command line.
* Install text editor of choice, preferrably an editor with directory browser (Sublime, Atom and WebStorm are all good alternatives).
* We will not go into the details about npm or gulp, if you are interested in how they work, please checkout the exercises from the js-infrastructure session: https://github.com/nerdschoolbergen/js-infrastructure

## Introduction
Write a short intro

## Agenda
* Pizza
* 20-30 minutes introduction to front-end challenges, style guides/design systems and Pattern Lab
* Forking git repository and get it running on local computer
* Run through the excercises found in this repo
* Try to create a functioning Pattern Lab site :)

## Getting started
We will start with creating your own fork of this repository.
Make sure you're logged in and click the Fork button up right.
Clone the repository to your local computer by opening command line, navigate to the folder you wish to work from, and type `git clone <Your new repo url>`

Navigate to the repository folder and run the following commands:

If you haven't installed the command line interface (CLI) for gulp yet, do so by installing it globally. From the command line type:

`npm install gulpjs/gulp-cli -g`

Once we have installed Gulp CLI globally its time to install the application dependencies using NPM. In your command line, navigate to the `styleguide` directory within our repo and type the following:

`npm install`

Once all dependencies are installed, we should be able to generate our Patter Lab solution. From the command line, still standing within the `styleguide` directory, type the following command (heads up, this command will open up your default browser):

`gulp serve`

This executes one of the main gulp tasks which compiles our solution. The task starts up a local web server that hosts the solution and the task will keep running and listen for changes on certain files within our solution.

The application will now open in your default browser at url: [http://localhost:3000](http://localhost:3000).

Try interracting a bit with the site just to get a feel for how its built. We will get more acquainted with the folder structure and build processes of Pattern Lab in **exercise 1**

## Helpful resources
* [Pattern Lab documentation](http://patternlab.io/docs/index.html)
* [Mustache template language documentation](https://mustache.github.io/mustache.5.html)
