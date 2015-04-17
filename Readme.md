# Screen Tunes

[![Code Climate](https://codeclimate.com/github/GenaBitu/screentunes/badges/gpa.svg)](https://codeclimate.com/github/GenaBitu/screentunes)

It turns out that some LCD monitors will emit a tone when patterns of repeating bars are displayed on the screen.
This pattern varies based on the size of the bars. The goal of this project is to eventually be able to play some
music through the screen using a web page.

I found out about this effect from the Hacker News comments on a page that was about a completely different bar spacing effect
but produced sound out of some monitors (including my external Samsung LCD).
[Some commenters](https://news.ycombinator.com/item?id=8856930) produced theories including that this is caused by
the expansion and contraction of capacitors in the display as the screen scans down and the black pixels take a different
amount of power than the white pixels. This theory suggests that varying the width of the bars would change the pitch,
which indeed does happen.

This is mainly intended as an experiment out of curiosity and geekery, it has no practical use.

## Technique

I simply created a full screen canvas where I draw an animated and variably spaced sequence of black and white bars.
Displaying this pattern in a large browser window on some LCD monitors produces a tone.

## Music

The script can play some basic music, which it loads from the file song.json. In this file, there must be:

* duration - the overall duration of the song, after which the song will be repeated
* individual notes with starting duration as the attribute and the note as the value

notes are not named(due to inconsistent naming) but instead are represented as the number of semitones (half-steps) from the base note.
The script is calibrating the device in such a way, that it tries to fit the first octave (values 0 to 12) to the device tonal range.

## Calibration

Before the actual script is started, the user is prompted to sed the lowest and highest tone, which he can hear. The script then
shifts the whole scale to best fit these settings.
