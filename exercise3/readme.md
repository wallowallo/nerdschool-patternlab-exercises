# Exercise 3 – Including patterns in one another

## Exercise 3a – Pattern includes
To include one pattern within another, for example to create a molecule from several atoms, you can use the default include syntax from Mustache.

The shorthand syntax uses the following format:
```
{{> [patternType]-[patternName] }}
```
For example, to include the following pattern in a molecule:
```
00-atoms/images/landscape-16x9.mustache
```
The shorthand include syntax would be:
```
{{> atoms-landscape-16x9 }}
```
The pattern type matches the top-level folder and is `atoms`. The pattern name matches the template file and is `landscape-16x9`. Any digits used for ordering are dropped from both the pattern type and pattern name. Pattern subtypes are never a part of the shorthand include syntax. This way patterns can be re-organized within a pattern type and/or by using digits without needing to change your pattern includes.

We are now going to try to include some patterns that we have allready created into another pattern. In the `_patterns/01-molecules` folder, try to identify three patterns: `logo-link`, `primary-navigation` and `breadcrumbs`.

You found them? Great! Now lets put includes to the test. Find the pattern `header` in `_patterns/02-organisms`. **Now using the the include syntax try to add the three patterns we found earlier into the header pattern**.

In case you're confused about where to put the includes in `header`, don't worry, we put some comments inside the pattern to help you.

If you've stopped the `gulp serve` task at this point, start it up again on the command line. If it's already running you should be able to navigate to [http://localhost:3000/?p=organisms-header](http://localhost:3000/?p=organisms-header) to witness the result of all your hard work. We now have a reasonably more functioning header.

So far we've only used includes to nest one level deep, but in theory there is no limitation to how deep the nesting goes. Lets try to take it one step further by including our newly improved `header` pattern in a page template.

Open the `homepage` pattern within `_patterns/03-templates` in your text editor. As you can see, we've allready included two patterns here: `hero` and `featured`. Lets see how it looks if we add the header. **Include the `header` pattern at the the top of the `homepage` pattern**.

Looking at [http://localhost:3000/?p=templates-homepage](http://localhost:3000/?p=templates-homepage) we should now have an pretty decent page template for our simple homepage. But still the "featured" setion seems very repetetive, the content for all four article teasers are identical. Not exactly a realistic scenario for any web page. In **exercise 3b** we'll look at how we can make this section a little more interesting using a built in feature of Pattern Lab called `listItems`.

## Exercise 3b – Repeating patterns with `listItems`
Many more complicated patterns may include lists of objects. For example, comments, headlines or news feeds. The Node version of Pattern Lab come with a simple way to fill out these lists with dynamic data so that you can quickly stub them out. The list data can be found in `./source/_data/listitems.json` and is accessed in patterns using the `listItems` key. Lists are randomized each time the Pattern Lab website is generated.

Let’s look at a simple example of iterating over a list. In your template you would create the following markup:

```mustache
<ul>
{{# listItems.four }}
    <li> {{ title }} </li>
{{/ listItems.four }}
</ul>
```
Let’s break this down before showing the results. The `#` denotes that Mustache needs to loop over the given key that contains multiple values, in this case `listItems.four`, and write-out the corresponding value `{{ title }}`. The `/` denotes the end of the block that’s being rendered. The Node version of Pattern Lab support the keys one through twelve. If you need more than twelve items for a given list you’ll need to add your own data.
**Important**: the keys one through twelve are Pattern Lab-specific and not a general feature of Mustache.

The above would compile to:

```html
<ul>
    <li> Rebel Mission to Ord Mantell</li>
    <li> Help, help, I'm being repressed!</li>
    <li> Bacon ipsum dolor sit amet turducken strip steak beef ribs shank</li>
    <li> Nullizzle shizznit velizzle, hizzle, suscipit own yo', gravida vizzle, arcu.</li>
</ul>
```
If you wanted six items in your list you’d write:

```mustache
<ul>
{{# listItems.six }}
    <li> {{ title }} </li>
{{/ listItems.six }}
</ul>
```
Now that you've seen how `listItems` works, let's try to implement it in the "featured" section of our `homepage` template.

First open up `featured.mustache` in your text editor, it's located under `_patterns/02-organisms/sections`. As you can see within the markup we're including the the pattern `{{> molecules-article-teaser }}` four times to create our list. **Do the same, but using `listItems` instead of repeating the pattern include**.

If done correctly, you should now see that the "featured" section on [http://localhost:3000/?p=templates-homepage](http://localhost:3000/?p=templates-homepage) is now dynamically populated with dummy data. This gives us a more relistic feel of how our design might look on a live website, and shows us if the design handles different content without messing up the layout.
