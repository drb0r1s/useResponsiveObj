<div align="center">
   <img src="https://i.imgur.com/MIi5AOX.png" alt="useResponsiveObj"></img>
</div>

# useResponsiveObj

# Content
- [About *useResponsiveObj*](https://github.com/drb0r1s/useResponsiveObj#about)
- [Installation](https://github.com/drb0r1s/useResponsiveObj#installation)
- [Usage](https://github.com/drb0r1s/useResponsiveObj#usage)

# About useResponsiveObj

- **useResponsiveObj** is a *custom React hook* based on the use of the *"Responsive Object"* to make React *responsive easier*.
- The **main advantage** of this React hook compared to the classic responsive is the *ease of use*, in addition, using this hook can determine the brakepoint *much faster*, which makes the whole responsive process *much faster and easier*.

**The value for a given breakpoint can be obtained via just one line of code.**

# Installation

- **useResponsiveObj** is available on *Github* and *NPM*, so it's very easy to download and use.

```
npm i use-responsive-obj
```

- After installing this React hook, it is necessary to add it to the code:

```js
import useResponsiveObj from "use-responsive-obj/useResponsiveObj"
```

# Usage

- **useResponsiveObj** consists of *Responsive Object* and *Breakpoints Object* (*default breakpoints* / *custom breakpoints*).

## Responsive Object
- The **Responsive object** is the main thing that *must be defined* when using this hook.
- This object is associated with the **Breakpoints object** in the sense that they *must have the same key names*.
- If a *Custom Breakpoints object* is not defined, then the key names in the Responsive object must be identical to those in the *Default Breakpoints object* (xxs, xs, sm, md, lg, xl, xxl).

*Example:*

```js
const resolution = useMemo(() => {
   return {
      xxs: "Small screen",
      xs: "Mobile",
      sm: "Tablet",
      md: "Laptop",
      lg: "Desktop",
      xl: "Large screen",
      xxl: "TV"
   }
}, []);
```

## Breakpoints Object
- The **Breakpoints object** is an object that can *(custom)* and does not have to be *(default)* defined.
- The *purpose* of this object is to *define the breakpoints that exist in this hook*. Based on the current breakpoint in the *Breakpoints object*, a certain value will be applied in the *Responsive object*.

The Breakpoints object is divided into **default** and **custom** by type.

### Default Breakpoints Object
- The **Default Breakpoints object** is one that contains *standard breakpoints* and will be applied if the *Custom Breakpoints object* is not defined.

*Example:*

```js
const breakpoints = useMemo(() => {
   return {
      xxs: "(max-width: 319px)",
      xs: "(min-width: 320px) and (max-width: 480px)",
      sm: "(min-width: 481px) and (max-width: 768px)",
      md: "(min-width: 769px) and (max-width: 1024px)",
      lg: "(min-width: 1025px) and (max-width: 1200px)",
      xl: "(min-width: 1201px) and (max-width: 1699px)",
      xxl: "(min-width: 1700px)"
   };
}, []);
```

*INFO: The default Breakpoints object is always the same and cannot be changed.*

### Custom Breakpoints Object
- If it is necessary to use *different breakpoints* than those defined in the *Default Breakpoints object*, this is possible by defining a **Custom Breakpoints object**.
- This type of object can be defined *completely as desired* in terms of *key names and breakpoint dimensions*.

The **dimensions of the breakpoint** in this type of object can be defined in *two ways*:
- Standard *(e.g. (min-width: 769px) and (max-width: 1024px))*,
- Using array \[min-width, max-width\] *(e.g. \[769, 1024\])*

#### Standard
- Defining a *Custom Breakpoints object* using the **standard method** is the same as defining *media queries*.

*Example:*

```js
const myStandardBreakpoints = useMemo(() => {
   return {
      xxs: "(max-width: 319px)",
      xs: "(min-width: 320px) and (max-width: 480px)",
      sm: "(min-width: 481px) and (max-width: 768px)",
      md: "(min-width: 769px) and (max-width: 1024px)",
      lg: "(min-width: 1025px) and (max-width: 1200px)",
      xl: "(min-width: 1201px) and (max-width: 1699px)",
      xxl: "(min-width: 1700px)"
   };
}, []);
```
