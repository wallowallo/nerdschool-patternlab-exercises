# Exercise 5 – Creating pseudo patterns

Sometimes it might be useful to have slight variations in a pattern, given a certain condition.
You _could_ create two separate patterns with near-identical code, but in the spirit of DRY, we're going to use pseudo patterns instead.

A pseudo pattern will show up as a separate item in the Pattern Lab menu, but it will share the same `.mustache` file as the "base" pattern. That file however, will contain a block of code only parsed if the condition is true-ish.

But to trigger it all you'll first need a `.json` file with a specific name syntax:
```
[base pattern name]~[variation].json
```
For example, if you wanted to the `subheading` in the logo to be optional, you could name it `logo-link~subheading.json` and give it
the following content:
```
{
  "subheading": true
}
```
Then change the `.mustache` to:
```
<a href="#" class="logo-link">
	<div class="logo-link__text">
		<div class="logo-link__heading">Donut Corp</div>
    {{# subheading }}
		  <div class="logo-link__subheading">Sticky since 2016</div>
    {{/ subheading }}
	</div>
</a>
```
.........