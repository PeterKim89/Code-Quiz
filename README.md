# Code-Quiz

## Introduction
In this programming quiz, the user will answer a series of 10 different programming related questions within 5 minutes. But for every wrong answer, the timer will deduct 30 seconds from the clock. If time runs out or if the user finishes all 10 questions in time, they can then input their name and score to a localized leaderboard. 

## Build Process
- Plan out how to approach each small part, which include the timer, the questions, the answers, the highscore, etc.
- Create a barebones index.html and style.css
- Add on to the html and css as needed
- Create the start button first and give it functionality
- Load in a single question after clicking start
- Create answer buttons for the questions
- Give the answer buttons functionality via click events
- Make it so that questions can load in and out as needed
- When quiz ends, stop the timer
- Make various parts of the application display and disappear on command

## Code Snippet
Using a bubblesort algorithim in reverse. This allows me to create a leaderboard with the highest scores at the top, while also introducing a tiebreaker element via tracking how much time was left on the clock.

```
function sortHighscore() {
    var tempArrayElement;
    for (i=0; i<highscoreArray.length - 1; i++)
    {
        for (j=0; j<highscoreArray.length - i - 1; j++)
        {
            if (highscoreArray[j][1] <= highscoreArray[j+1][1])
            {
                tempArrayElement = highscoreArray[j+1];
                highscoreArray[j+1] = highscoreArray[j];
                highscoreArray[j] = tempArrayElement;
            }
            else if (highscoreArray[j][2] <= highscoreArray[j+1][2])
            {
                tempArrayElement = highscoreArray[j+1];
                highscoreArray[j+1] = highscoreArray[j];
                highscoreArray[j] = tempArrayElement;
            }                
        }
    }
}
```

## Languages
- Javascript
- HTML
- CSS

## Author
[GitHub](https://github.com/PeterKim89) <br>
[LinkedIn](www.linkedin.com/in/peter-kim89) <br>
[Email]Peter.kim@uconn.edu

## License
[MIT](https://choosealicense.com/licenses/mit/) <br>
Copyright (c) [2022] [Peter Kim]