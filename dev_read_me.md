#Dot Eater Game

##About

[Dot Eater Live](https://evandapolarbear.github.io/dot_eater_game/)

In this game(inspired by [agar](agar.io)), a player attempts to guide their dot so that it eats
smaller dots smaller than themselves, while avoiding getting eaten by larger dots.

The game has a minimalist design and infinite levels making it a good way to unwind after a
stressful day

##Wireframes
My game will consist of a single screen a large window for game play and
buttons on the bottom that link to this github.  Additionally, there will be
pause button described in the bonus features if time allows.

![before play](./wireframes/before_play.png)
![in play](./wireframes/in_play.png)


##Architecture and Technologies.

I will these technologies to implement this project:
* Webpack to bundle my JS files into an entry file.
* HTML Canvas to animate all cells and control opposition cells.
* Vanilla javascipt to allow the user to control their cell.

Besides my entry file, I will have a screen.js file that will take care of
tracking and rendering all cells and their collisions.

I will also have a user.js file to track the user input and give the
appropriate inputs to the screen.js.

##Implementation Timeline

###Day 1
Get all setup done on the project including installing webpack.
I also will need to begin remembering Canvas.

Goals:
* Get all setup done.
* Relearn enough Canvas to get static shapes to show up in the browser.
* Deploy site to github pages

###Day 2
Get canvas to animate random movements and deal with collisions of cells.

Goals:
* Have Cells that move at random.
* When two cells collide have the larger one absorb the smaller one.

###Day 3
Use Vanilla javascript to allow the player to control their own cell.
Also create links to github and get a media player that allows for paused
music.

Goals:
* Allow user to pilot a cell around the map using arrow keys
* Add github link
* Add media Player and pause button

###Day 4
Finish styling all elements and fix any remaining bugs

Goals:
* Have a fully working game

##Bonus
- [ ] Add new enemies at random times from offscreen.
- [ ] Zoom out as player gets bigger.
- [ ] Give enemy cells a simple AI.
