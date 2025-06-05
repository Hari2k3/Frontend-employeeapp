import React, { useEffect, useRef } from "react"

import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import logo from '../../assets/kv-logo.png'
import './LoginRightPanel.css'


export const UncontrolledLogin = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if(usernameRef.current) {
            usernameRef.current?.focus();
        }
    },[])

    const handleNativeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
    }

    const clearUsername = () => {
        if (!usernameRef.current) return
        usernameRef.current.value = "";
        if (!clearButtonRef.current) return
        clearButtonRef.current.disabled = true;
    }

    const updateClearButton = () => {
        if (!usernameRef.current) return
        if(usernameRef.current.value?.length > 0) {
            if (!clearButtonRef.current) return    
            clearButtonRef.current.disabled = false;
            clearButtonRef.current.onclick = clearUsername;

        }else {
            if (!clearButtonRef.current) return    
            clearButtonRef.current.disabled = true;
        }
    }


    return (
        <div className="login-div">
            <form className="login-form-container">
                <div className="login-form-element">
                    <img src={logo} className="logo"/>
                </div>
                <div className="login-form-element">
                    <Input variant="login" name="username" type="text" label="Username" placeholder=" "  inputRef={usernameRef}
                        onchange={updateClearButton}
                        endAdornment={<Button type="button" variant="grey" text="X" disabled={true} buttonRef={clearButtonRef} className="button-endadornment" onclick={clearUsername}/>}
                    />


                    <Input variant="login" name="password" type="Password" label="Password" placeholder=" " />

                    <div className="login-form-element">
                        <Button variant="blue" className="button-login" type="submit" text="Login"/>
                    </div>

                </div>
            </form>
        </div>
    )
}