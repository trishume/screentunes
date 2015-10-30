# Screen Tunes

It turns out that some LCD monitors will emit a tone when patterns of repeating bars are displayed on the screen.
This pattern varies based on the size of the bars. The goal of this project is to eventually be able to play some
music through the screen using a web page.

I found out about this effect from the Hacker News comments on a page that was about a completely different bar spacing effect
but produced sound out of some monitors (including my external Samsung LCD).
[Some commenters](https://news.ycombinator.com/item?id=8856930) produced theories including that this is caused by
the expansion and contraction of capacitors/inductors in the display as the screen scans down and the black pixels take a different
amount of power than the white pixels. This theory suggests that varying the width of the bars would change the pitch,
which indeed does happen.

This is mainly intended as an experiment out of curiosity and geekery; it has no practical use.

## Technique

I simply created a full screen canvas where I draw an animated and variably spaced sequence of black and white bars.
Displaying this pattern in a large browser window on some LCD monitors produces a tone.

## Plans

#### Music

Theoretically this could be used to play simple digital chiptune-like songs. By animating to different bar widths the notes
could be changed at around 60HZ. It might even be possible to play multiple notes at once by either partitioning the screen
vertically into different chunks with different bar widths on each, or perhaps just alternating bar widths at 60HZ might be too
fast for the ear to discern the alternation.

#### Calibration

Using the web audio API I could direct users to put a microphone near their screen and do a bar width sweep and record the
frequency and relative amplitude. This could used for both data collection on this phenomenon and to calibrate the playing of
music to emit the correct pitch at the correct amplitude.
