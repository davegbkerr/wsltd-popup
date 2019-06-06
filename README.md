# A popup!

## Execution

**```/dist/bundle.js``` is compiled file that can be run from console**

zip archive ```ws-popup.zip``` contains source and compiled files only

## Description / Spec

Console-runable component to generate popup as per spec:

* Run from console
* Display popup
* Start counting down from 2 minutes as soon as the pop-up shows
* When countdown reaches 0, the pop up should fade out, and the counter should stop
* Price shown on the pop up should be dynamic to all product detail pages
* Discounted price should be 20%
* User has an option to enter their email address in the input field
* When user enters their email, the countdown timer will stop and a 'thank you' message should appear on the pop up
* User should be able to close the pop up by clicking only on the close icon or outside the popup
* The pop up should only show once, when refreshing the page, the pop up should not show again
* The pop-up should be responsive across all devices

## Mockups

Mobile:

![Mobile Mockup](mobile.jpg)

Desktop:

![Desktop Mockup](desktop.jpg)


## Stack

webpack / react / sass

## Key source Files

* ```/demo/src/index.js``` - entry-point, App wrapper
* ```/src/popup.js``` - popup component
* ```/src/timer.js``` - countdown timer component
* ```/src/signup.js``` - email form component
* ```/src/styles.scss``` - sass stylesheet