
# *Holo Test Automation Task*

This repository contains automated tests for the Holo Test application using Cypress. Follow the instructions below to install, execute, and generate reports for the test suite.

---

## *Table of Contents*
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Tests](#running-the-tests)
4. [Notes](#notes)

---

## *Prerequisites*
Ensure you have the following installed on your machine:
- *Node.js*: Version v22.11.0 [Download Node.js here](https://nodejs.org/).
- *Cypress*: Installed version v13.15.2 using the instructions below.

---

## *Installation*

1. *Install Node.js*:
   - Verify the installation:
     node -v
     
   - Ensure the version is v22.11.0.

2. *Install Cypress*:
   - Run the following command to install Cypress:
     npx cypress install
     
   - Verify Cypress installation by opening the Test Runner:
     npx cypress open
     

---

## *Running the Tests*

#### *1. Open Cypress Test Runner*
 - To execute tests with an active interface: npx cypress open
 - To create report or run the tests without active interface please use "npm run test:report / npx cypress run".
 - You can view the test results in the Cypress Test Runner (if opened) or directly in the PowerShell window (for the headless run).
 - Use tool like pycharm to edit/conrtol the script as you need
 - The report will be located in this path (Holo Test Automation Task\cypress\reports)


## *Notes*

  - Take care in scenario number 4 to select a product order that should have a price.


