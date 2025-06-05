import type { ChangeEvent } from 'react';
import './SelectComponent.css'

interface Props {
    label: string
    name: string;
    value? : string;
    onchange? : (event:ChangeEvent<HTMLSelectElement>) => void;
    options: {
        key: string;
        value: string;
    }[];
}

export const SelectComponent = (props: Props) => {
    return (
        <div className="form-element">
            <label>{props.label}</label>
            <select name={props.name} value={props.value} onChange={props.onchange}>
                {props.options.map((option) => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}