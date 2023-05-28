
CSS Notes:
< !-- * {
  font-family: sans-serif;
  color: white;
} -->
Sets the font for everything using the CSS
You can call HTML Code using the same discriptors they are called in HTML
Body selcts the body
header will select the header
h1 and so on will selet that text
and p will select paragrahs
you can give them names to call specific ones in the html.
Using divs in your html is very useful in order to target the desired text an example of divs and named divs looks like this
HTML:
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>

CSS:
.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}


Notes From Review:
Subdomain formant would be like cs260.cs.byu.edu
.com or edu is a tld
DOM textContent sets the child text for an element (js)
<div> stands for division
Chmod +x deploy.sh makes a script executeable
CNAME ia a DNS record that points to another DNS record
CSS Structure is Margin, Border, Padding, Content.
