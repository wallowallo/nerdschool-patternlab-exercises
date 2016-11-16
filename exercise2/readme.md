# Exercise 2 – Adding new patterns

Just to get started we will try to create a very simple pattern

Navigate to `styleguide/source/_patterns/00-atoms` and create a new folder named `text`. Create a new file and name it `paragraph.mustache`.

Within your newly created file type in the following:
```
<p>{{ excerpt.short }}</p>
```
Save your file and in your terminal run `gulp serve` from within the `styleguide` folder. As described in the introduction, this will open up your default web browser and display our Pattern Lab solution.

As you can see, our `text` folder is now visible under `atoms` in the menu. If you now click `paragraph` you will se our newly created pattern rendered out.

As you might have noticed. The paragraph we created now contains a bunch of dummy text. This is because in our pattern we utilized a Mustache variable: `{{ excerpt.short }}`. Mustache variables are contained within double curly brackets, and they render contens stored in a JSON object. In the case of `excerpt.short` this is stored in the `data.json` file, which you can find under `styleguide/source/_data/` in our repo. `data.json`is a file that comes bundled with Pattern Lab, and it holds dummy data that you would commonly use when prototyping a website.
