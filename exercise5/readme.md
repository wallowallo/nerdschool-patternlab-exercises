# Exercise 5 – Using pattern-specific JSON files

Like `data.json`, the global key-value store for Pattern Lab, you can also
use pattern-specific JSON files to store data only relevant for that pattern.

Doing so is as simple as creating a file with the same name as the pattern's
`.mustache` file, with a `.json` extension, and in the same directory.

Here's an example of what this file may contain:
```
{
  "userobj" {
    "name": "John Doe",
    "email": "john@doe.com"
  },
  "truestory": false,
  "sometext": "Lorem ipsum dolor sit amet",
  "somehtml": "<p>Lorem <strong>ipsum</strong> dolor sit amet</p>",
  "anarray": [
    { "objtext": "Hello, I'm an object" },
    { "objtext": "I, too, am an object"}
  ]
}
```

### Task: Create a pattern-specific JSON file for any of your patterns
...then move any hard-coded content from the `.mustache` to a key-value pair in
the `.json` and make sure it works.

#### Bonus tasks
- What happens if you define a key/variable in the pattern-specific JSON that
already exists with a different value in the global `data.json`? Which one, if any, takes precedence?
- What happens when a pattern that relies on its JSON for content get included
from another pattern? Does the pattern-specific JSON "tag along"?
