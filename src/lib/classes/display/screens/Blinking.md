# Readme: Blinking Active Zones

The basis for this is a bit complicated so I should explain
what the hell is hapening here, each "zone" in our dashboards
take one of two foreground colours, this is called that zone's
real colour, but when a zone's value is changed we want it to
flash between _that_ colour and the alternative colour for like ten
minutes, where each colour cycle lasts for around ~7 minutes.

For clarification these colours are gray-50 and gray-400.

To keep track of this we take a look at the current milisecond's
10th least significant bit, if it is a 1 every active zone takes colour
gray-50, if it is 0 every active zone is gray-400, we keep track
of how many times we change colours and we stop when the active
zone reaches its intended colours and swapped colours more than
10 times.

This is both very fast because it is based on bitwise arithmatic
and also looks uniform.
