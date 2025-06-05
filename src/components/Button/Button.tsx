import './Button.css'

interface Props {
    text: string;
    variant: string;
    className?: string;
    type: "submit" | "reset" | "button" | undefined;
    onclick?: any;
    disabled?: boolean;
    buttonRef?: React.Ref<HTMLButtonElement>;
}

export const Button = (props: Props) => {
    return (
        <button className={`button button--${props.variant} ${props.className}`} type={props.type} onClick={props.onclick} ref={props.buttonRef} disabled={props.disabled}>{props.text}</button>
    )
}