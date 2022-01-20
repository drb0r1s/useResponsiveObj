<div align="center">
   <img src="https://i.imgur.com/MIi5AOX.png" alt="useResponsiveObj"></img>
</div>

# useResponsiveObj

# Content
- [About *useResponsiveObj*](https://github.com/drb0r1s/useResponsiveObj#about)
- [Installation](https://github.com/drb0r1s/useResponsiveObj#installation)
- [Usage](https://github.com/drb0r1s/useResponsiveObj#usage)
   - [Responsive Object](https://github.com/drb0r1s/useResponsiveObj#responsive-object)
   - [Breakpoints Object](https://github.com/drb0r1s/useResponsiveObj#breakpoints-object)
      - [Default Breakpoints Object](https://github.com/drb0r1s/useResponsiveObj#default-breakpoints-object)
      - [Custom Breakpoints Object](https://github.com/drb0r1s/useResponsiveObj#custom-breakpoints-object)
         - [Standard](https://github.com/drb0r1s/useResponsiveObj#standard)
         - [Array](https://github.com/drb0r1s/useResponsiveObj#array)
- [Examples](https://github.com/drb0r1s/useResponsiveObj#examples)
- [Functionality](https://github.com/drb0r1s/useResponsiveObj#functionality)

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

- When defining **useResponsiveObj**, *2 parameters* can be entered *(responsive object and custom breakpoints object)*. Of which the **responsive object is mandatory**.

```js
const { responsive } = useResponsiveObj(object, customBreakpoints);
```

- After defining this hook, the value **"responsive"** is obtained, this value is obtained as the *key value of the current breakpoint*, obtained from the *responsive object*.

- As mentioned, **useResponsiveObj** consists of *Responsive Object* and *Breakpoints Object* (*default breakpoints* / *custom breakpoints*).

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
      small: "(max-width: 319px)",
      mobile: "(min-width: 320px) and (max-width: 480px)",
      tablet: "(min-width: 481px) and (max-width: 768px)",
      laptop: "(min-width: 769px) and (max-width: 1024px)",
      desktop: "(min-width: 1025px) and (max-width: 1200px)",
      large: "(min-width: 1201px) and (max-width: 1699px)",
      tv: "(min-width: 1700px)"
   };
}, []);
```

#### Array
- An *easier way* to define a *Custom Breakpoints object* is by **using arrays**.
- Defining is done by entering the value of the object as \[min-width, max-width\] *without px*.
- **If only the minimum or maximum width needs to be entered, then false is used instead of the unnecessary width.**

*Example:*

```js
const myArrayBreakpoints = useMemo(() => {
   return {
      small: [false, 319],
      mobile: [320, 480],
      tablet: [481, 768],
      laptop: [769, 1024],
      desktop: [1025, 1200],
      large: [1201, 1699],
      tv: [1700, false]
   };
}, []);
```

## Responsive Object & Breakpoints Object
- As already explained, *the Responsive object and the Breakpoints object are related*.
- In order for the React hook to function normally, **it is necessary that the Responsive object and the Breakpoints object have keys with the same names**. The reason for this is explained in [functionality](https://github.com/drb0r1s/useResponsiveObj#functionality).

**IMPORTANT:** For the best possible experience when using **useResponsiveObj**, it is necessary that the **Responsive object** and the **Breakpoints object** be within the **useMemo** hook.

*Example:*

```js
const object = useMemo(() => {
   return {...};
}, []);
```

# Examples
- The following *examples* may help to better understand how this *React hook* works.

## Display text (Default Breakpoints Object)
- The following example shows how it is possible to *change the content of the h1* element based on **different breakpoints**, which are defined in the *Default Breakpoints object*.

```js
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import useResponsiveObj from "use-responsive-obj/useResponsiveObj";

const App = () => {
   const displaySize = useMemo(() => {
      return {
         xxs: "Small screen",
         xs: "Mobile",
         sm: "Tablet",
         md: "Laptop",
         lg: "Desktop",
         xl: "Large screen",
         xxl: "TV"
      };
   }, []);
   
   const { responsive } = useResponsiveObj(displaySize); 
   
   return <h1>Display size: {responsive}</h1>;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Canvas size (Default Breakpoints Object)
- This *React hook* can be quite useful in this example. Based on the Responsive object *(responsiveCanvas)*, the width and height of the canvas can be changed. The React hook uses the *"responsive" constant* **to return the object that corresponds to the current breakpoint (Default Breakpoints object)**. With object gain we can easily change the *width* and *height* of the canvas depending on the *current breakpoint*.

```js
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import useResponsiveObj from "use-responsive-obj/useResponsiveObj";

const App = () => {
   const responsiveCanvas = useMemo(() => {
      return {
         xxs: { width: "220", height: "200" },
         xs: { width: "350", height: "250" },
         sm: { width: "500", height: "270" },
         md: { width: "850", height: "300" },
         lg: { width: "1100", height: "350" },
         xl: { width: "1300", height: "400" },
         xxl: { width: "1500", height: "500" }
      };
   }, []);
   
   const { responsive } = useResponsiveObj(responsiveCanvas); 
   
   return(
      <canvas
         width={responsive ? responsive.width : "100"}
         height={responsive ? responsive.height : "100"}
         style={{ border: "1px solid black" }}
      ></canvas>
   );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Appearance Of Text (Custom Breakpoints Object)
- In this example you can see the *definition and use* of the **Custom Breakpoints object**. Because custom breakpoints are used, **the key names in the Responsive object need to be the same as the key names in the Custom Breakpoints object**. Also in this example we can see how breakpoint dimensions can be defined *using arrays*. The first array index is the *minimum*, and the second is the *maximum* value in **pixels**. If it is not necessary to define the maximum width (as in the example), **false** is used instead of the number.

```js
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import useResponsiveObj from "use-responsive-obj/useResponsiveObj";

const App = () => {
   const showText = useMemo(() => {
      return {
         mobileAndTablet: "This text will appear on mobile and tablet",
         desktopAndLargeScreen: "This text will appear on desktop and large screen"
      };
   }, []);
   
   const myBreakpoints = useMemo(() => {
      return {
         mobileAndTablet: [320, 768],
         desktopAndLargeScreen: [769, false]
      };
   }, []);
   
   const { responsive } = useResponsiveObj(showText, myBreakpoints); 
   
   return <h1>{responsive}</h1>;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Change Components (Custom Breakpoints Object)
- **Components** can also be changed in this way. Based on the *Custom Breakpoints object*, depending on the current screen width, different components will be displayed depending on what it is intended for *(Mobile and Desktop)*.

```js
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import useResponsiveObj from "use-responsive-obj/useResponsiveObj";

const App = () => {
   const resolution = useMemo(() => {
      return {
         mobile: <Mobile />,
         desktop: <Desktop />
      };
   }, []);
   
   const myBreakpoints = useMemo(() => {
      return {
         mobile: [false, 480],
         desktop: [481, false]
      };
   }, []);
   
   const { responsive } = useResponsiveObj(resolution, myBreakpoints); 
   
   return <>{responsive}</>;
}

const Mobile = () => {
   return(
      <div className="mobile">
         <h1>Mobile Resolution</h1>
      </div>
   );
}

const Desktop = () => {
   return(
      <div className="desktop">
         <h1>Desktop Resolution</h1>
      </div>
   );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

# Functionality

How the **useResponsiveObj** React hook works can be explained as follows. After defining the *hook* and *Responsive object*, a function is run that checks whether the **default** or **custom** *Breakpoints object* is used. After determining the *breakpoint*, a check begins which breakpoint corresponds to the current screen width. When the appropriate breakpoint is found, it is checked whether the *Responsive object* has a key with the same name that has the *breakpoint currently active*. If there is **no key** with the same name, the returned value is **false**. However, if **there is a key** in the entered object that is the same as the key that has the breakpoint, then the *Responsive value of the object located on that key is returned*. The **"responsive"** constant has a return value of the hook and it is used for further work.
