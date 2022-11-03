import {useReducer, useLayoutEffect, useRef} from 'react'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

const NavigationLogic = () => {

    const defaultState = {
    dropdown: "hidden",
    mobileMenu: "hidden",
    buttonIcon: faBars,
    navPosition: "relative",
    webLinkDesign: false
    }

    const reducer = (state, action) => {
    const {type, payload} = action 
    switch(type) {
        case "CLICK":
            return {...state, dropdown: payload.dropdown, buttonIcon: payload.buttonIcon}
        case "RESIZE":
            return {...state, dropdown: payload.dropdown, mobileMenu: payload.mobileMenu, navPosition: payload.navPosition, webLinkDesign: payload.webLinkDesign}
        default: return
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultState);

    const openMenu = () => {
        dispatch({ 
            type: "CLICK",
            payload: {
                dropdown: state.dropdown === "hidden" ? "block" : "hidden",
                buttonIcon: state.dropdown === "hidden" ? faXmark : faBars
            }
        })
    };

    const showMenu = () => {
        dispatch({ 
            type: "RESIZE",
            payload: {
                dropdown: window.innerWidth < 768 ? "hidden" : "block",
                mobileMenu: window.innerWidth < 768 ? "block" : "hidden", 
                navPosition: window.innerWidth < 768 ? "absolute" : "relative",
                webLinkDesign: window.innerWidth < 768 ? false : true
            }
        })
    };
    const ref = useRef(null)
    
    const scrollUp = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
    };

    useLayoutEffect(() => {
    
    window.addEventListener('resize', showMenu);
    showMenu();
    return () => window.removeEventListener('resize', showMenu);
  }, []);

    const value = {
        dropdown: state.dropdown,
        mobileMenu: state.mobileMenu,
        buttonIcon: state.buttonIcon,
        navPosition: state.navPosition,
        webLinkDesign: state.webLinkDesign,
        openMenu,
        showMenu,
        ref,
        scrollUp
    }
    return value
}

export default NavigationLogic