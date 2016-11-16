# Exercise 4a – Using pattern parameters

By now you've hopefully seen how you can reference variables and their values in
your patterns.

Within any pattern you can reference variables
present in `data.json`, but when including the pattern in another,
we get the option to add additional variables: Pattern parameters.

This is a simple mechanism with a reach limited to the included pattern alone
(i.e. it does not reach patterns included in the included, unless the included
includes another with it's own parameters... Got that? Good! :D).

A typical use-case could be to include several button atoms in, say, a toolbar
molecule. The buttons would look the same and have the same markup (and thus
be the same atom), but the `{{label}}` on the button would need to be different for each.

Examples:
```
{{> [patternType]-[patternName](variable: value) }}
{{> [patternType]-[patternName](variable1: value1, variable2: "String value") }}
```

### Task: Modify `header.mustache` to make breadcrumbs optional
Find the line of code that includes `molecules-breadcrumb` and wrap it in...
```
{{#breadcrumbs}}
...
{{/breadcrumbs}}
```

### Task: Add the header include to the `article` template
...and pass `breadcrumbs: true` to the header.


# Exercise 4b - Using `styleModifier`

styleModifier is a concept similar to pattern parameters, but with it's own
syntax and a predefined variable name. It is typically used to add _modifier class(es)_
to elements that in some way, big or small, change their appearance.

Like pattern parameters...
- you need to define where to use it in the `.mustache` file, and
- it will only be available to the first level of includes.

Example include:
```
{{> [patternType]-[patternName]:mycomponent--dark }}
```
Usage in the included pattern:
```
<div class="mycomponent {{styleModifier}}">
...
</div>
```

### Task: Modify `logo-link.mustache`
...to use `styleModifier` as a modifier class in the main wrapping `a` element

### Task: Modify `header.mustache`
...to include the link-logo pattern with modifier: `logo-link--fastspin`

**PS:** If your logo now disappears it may be because of an [open bug](https://github.com/pattern-lab/patternlab-node/issues/250) in Pattern Lab
affecting patterns included _with_ parameters. Workaround for now is to remove those parameters from the templates including the `header` organism.