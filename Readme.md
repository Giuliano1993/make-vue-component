# Make-vue-component

This is a small package born to not always have to write from scratch or copy paste new vue components.
To run it, in your root just run

```bash
npx make-vue-component componentName
```

and you will have a brand new vue component in you `src/components` foleder.

## Options

### Component Name `required`

The component name is the name of the file and of the component. 
You can also create it into nested folder, you just need to write the path from the components, for example

```bash
npx make-vue-component admin/componentName
```

will create the new component in the `src/components/admin` folder


### API

The created components use by default the options API; if you wish to use the composition API you just need to add the `-c` flag

i.e.

```bash
npx make-vue-component -c componentName
```