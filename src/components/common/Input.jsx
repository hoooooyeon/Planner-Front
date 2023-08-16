import styled from 'styled-components';

const StyledInput = styled.input`
    box-sizing: border-box;
    border: none;
    outline: none;
    width: 256px;
    height: 36px;
    text-indent: 10px;
    border-radius: 5px;
    transition: box-shadow 0.1s ease-in;

    &:hover {
        box-shadow: 0px 3px 6px var(--md-sys-color-shadow);
    }

    &:focus {
        box-shadow: 0px 3px 6px var(--md-sys-color-shadow);
    }
`;

const Input = ({ className, type, name, placeholder, onChange, value }) => {
    return (
        <StyledInput
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
};

export default Input;
