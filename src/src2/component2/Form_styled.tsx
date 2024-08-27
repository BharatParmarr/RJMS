import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const FormContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 20px;
    text-align: center;
`;

export const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const Image_priview = styled.img`
    width: 100%;
    margin-bottom: 15px;
    border-radius: 4px;
`;