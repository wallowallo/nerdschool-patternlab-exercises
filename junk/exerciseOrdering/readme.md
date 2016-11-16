# Exercise X – Ordering patterns
By default, Node version of Pattern Lab organizes pattern types, pattern subtypes, and patterns alphabetically when displaying them in the drop-down navigation, pattern subtype “view all” pages, and the “all” style guide. This may not meet your needs. You can re-order pattern types, pattern subtypes and patterns by prefixing them with two digit numbers.

For example, we’ll look at how we can re-organize patterns. Say you have a `lists` folder inside your `atoms` folder which holds all you list patterns. Using alphabetical ordering the `lists` pattern subtype in `atoms` could look like:
```
definition.mustache
ordered.mustache
unordered.mustache
```
This is also the order they’ll show up in the drop-down navigation. Because you rarely need to see the definition list pattern maybe you want to have it show up last in the navigation. To re-order the patterns just add numbers to the beginning:
```
01-ordered.mustache
02-unordered.mustache
03-definition.mustache
```
The numbers will not show up when Pattern Lab displays the name of the pattern in the drop-down navigation. They’re simply a re-ordering mechanism.

##Her kommer oppgave
