import { useState, useEffect, useCallback, useMemo } from "react";

const useResponsiveObj = (object, customBreakpoints) => {
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

    const [usedBreakpoints, setUsedBreakpoints] = useState();
    
    const [currentBreakpoint, setCurrentBreakpoint] = useState("");
    const [responsive, setResponsive] = useState();

    useEffect(() => {
        if(typeof object !== "object") return responsiveError("not_responsive_object", typeof object);
        
        if(
            customBreakpoints !== undefined &&
            typeof customBreakpoints === "object"
        ) {
            const allCustomBreakpointsKeys = Object.keys(customBreakpoints);
            const allCustomBreakpointsValues = Object.values(customBreakpoints);

            const allObjectKeys = Object.keys(object);
            const allObjectValues = Object.values(object);
            
            for(let i = 0; i < allObjectKeys.length; i++) {
                let noValidKey = true;

                for(let j = 0; j < allCustomBreakpointsKeys.length; j++) {
                    if(allObjectKeys[i] === allCustomBreakpointsKeys[j]) noValidKey = false;
                }

                if(noValidKey) responsiveError("undefined_breakpoint", {
                    key: allObjectKeys[i],
                    value: allObjectValues[i]
                }, true);
            }

            let newObject = customBreakpoints;

            allCustomBreakpointsValues.forEach((breakpoint, index) => {
                if(
                    !Array.isArray(breakpoint) &&
                    typeof breakpoint !== "string"
                ) return responsiveError("breakpoint_type", {
                    key: allCustomBreakpointsKeys[index],
                    value: breakpoint,
                    type: typeof breakpoint
                });
                
                if(Array.isArray(breakpoint)) {
                    if(breakpoint.length !== 2) return responsiveError("length", breakpoint.length);

                    let responsiveString;
                    
                    for(let i = 0; i < breakpoint.length; i++) {
                        if(
                            typeof breakpoint[i] !== "number" &&
                            breakpoint[i] !== false
                        ) return responsiveError("type", typeof breakpoint[i]);
                    }

                    if(
                        breakpoint[0] === false &&
                        breakpoint[1] === false
                    ) return responsiveError("both_false");

                    if(breakpoint[0] === false && typeof breakpoint[1] === "number")
                        responsiveString = `(max-width: ${breakpoint[1]}px)`;
                    else if(typeof breakpoint[0] === "number" && breakpoint[1] === false)
                        responsiveString = `(min-width: ${breakpoint[0]}px)`;
                    else responsiveString = `(min-width: ${breakpoint[0]}px) and (max-width: ${breakpoint[1]}px)`;
                    
                    newObject = {...newObject, [allCustomBreakpointsKeys[index]]: responsiveString}
                }
            });

            setUsedBreakpoints(newObject);
        }

        else if(
            customBreakpoints !== undefined &&
            typeof customBreakpoints !== "object"
        ) return responsiveError("not_object", typeof customBreakpoints);

        else setUsedBreakpoints(breakpoints);
    }, [object, breakpoints, customBreakpoints]);

    const checkBreakpoint = useCallback(() => {
        const allBreakpointsKeys = Object.keys(usedBreakpoints);
        const allBreakpointsValues = Object.values(usedBreakpoints);
        
        let responsiveValue = "";
        
        for(let i = 0; i < allBreakpointsValues.length; i++) {
            if(window.matchMedia(allBreakpointsValues[i]).matches) responsiveValue = i;
        }

        setCurrentBreakpoint(allBreakpointsKeys[responsiveValue]);
    }, [usedBreakpoints]);

    useEffect(() => {
        if(typeof usedBreakpoints === "object") {
            checkBreakpoint();

            window.addEventListener("resize", checkBreakpoint);
            return () => { window.removeEventListener("resize", checkBreakpoint) }
        }
    }, [usedBreakpoints, checkBreakpoint]);

    useEffect(() => {
        if(currentBreakpoint) {
            const allObjectKeys = Object.keys(object);
            const allObjectValues = Object.values(object);
            
            let noBreakpoint = true;

            for(let i = 0; i < allObjectKeys.length; i++) {
                if(currentBreakpoint === allObjectKeys[i]) {
                    setResponsive(allObjectValues[i]);
                    noBreakpoint = false;
                }
            }

            if(noBreakpoint) setResponsive(false);
        }
    }, [currentBreakpoint, object]);

    return { responsive };
}

function responsiveError(type, payload, isWarning) {
    const ERRORS = {
        NOT_RESPONSIVE_OBJECT: `Invalid responsive object type: ${payload}! The responsive object must be defined as an object.`,
        NOT_OBJECT: `Invalid custom breakpoints type: ${payload}! Custom breakpoints must be an object.`,
        BREAKPOINT_TYPE: `Invalid breakpoint value in custom breakpoints object!\nKey: ${payload.key} / Value: ${payload.value}\nType: ${payload.type}\n- Breakpoint value must be an array or a string.`,
        LENGTH: `Invalid array length: ${payload}! Array length must be 2 ([min-width, max-width]).`,
        TYPE: `Invalid value type: ${payload}! Type of value must be number or boolean (false).`,
        BOTH_FALSE: "Both values in the array are false! At least one value must be a number."
    }

    const WARNINGS = {
        UNDEFINED_BREAKPOINT: `The responsive object contains a value that is not defined in the custom breakpoints object.\nKey: ${payload.key} / Value: ${payload.value}\nTo fix this add { ${payload.key}: [min-width, max-width] } in your custom breakpoints object.`
    }

    const allErros = Object.values(ERRORS);
    const allErrorsKeys = Object.keys(ERRORS);

    const allWarnings = Object.values(WARNINGS);
    const allWarningsKeys = Object.keys(WARNINGS);

    allErrorsKeys.forEach((key, index) => {
        if(key === type.toUpperCase()) return console.error(`${key}_ERROR: ${allErros[index]}\n-useResponsiveObj`);
    });

    if(isWarning) {
        allWarningsKeys.forEach((key, index) => {
            if(key === type.toUpperCase()) return console.warn(`${key}_WARNING: ${allWarnings[index]}\n-useResponsiveObj`);
        });
    }
}

export default useResponsiveObj;